
let playPauseButton = document.getElementById('playPause');
let playPauseImage = document.getElementById('playPauseImg');
let isPlaying = false;
function togglePlayPause() {
  if (isPlaying) {
    // playPauseButton.textContent = 'Play';
    playPauseImage.src = 'play.jpg';
  } else {
    // playPauseButton.textContent = 'Pause';
    playPauseImage.src = 'pause.jpeg';
  }
  isPlaying = !isPlaying;
}
playPauseButton.addEventListener('click', togglePlayPause);





// let audio = new Audio("song.mp3");
// let isPlayingAudio = false;
// function playAudio() {
//     if (!isPlayingAudio) {
//       audio.play();
//     } else {
//       audio.pause();
//     }
//     isPlayingAudio = !isPlayingAudio;
//   }
//   playPauseButton.addEventListener('click', playAudio);


// let audioContext = new AudioContext();
// const audioFileURL="song.mp3";
// let source;
// function playAudio(audioBuffer) {
//   source = audioContext.createBufferSource();
//   source.buffer = audioBuffer;
//   source.connect(audioContext.destination);
//   source.start();
// }
// function stopAudio() {
//   if (source) {
//     source.stop();
//     source.disconnect(); // Disconnect the source node
//   }
// }
// let isPlayingAudioContext = false;
// function playAudioContext() {
//     if (!isPlayingAudioContext) {
//       fetch(audioFileURL)
//       .then(response => response.arrayBuffer())
//       .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
//       .then(audioBuffer => {
//         playAudio(audioBuffer);
//       })
//       .catch(error => console.error('Error loading audio file:', error));
//     } else {
//       stopAudio();
//     }
//     isPlayingAudioContext = !isPlayingAudioContext;
// }
// playPauseButton.addEventListener('click', playAudioContext);





// let audioContext = new AudioContext();
// let leftEarOsc = null;
// let rightEarOsc= null;
// function playMusic() {

//           let baseFreq =parseInt( document.getElementById('baseFre').value);
//           let beatFreq = parseInt(document.getElementById('beatsFre').value);
//           let vol =parseFloat( document.getElementById('volume').value);
//           storeData(baseFreq,beatFreq,vol);

//           leftEarOsc = audioContext.createOscillator();
//           rightEarOsc = audioContext.createOscillator();

//           leftEarOsc.type = "sine";
//           rightEarOsc.type = "sine";

//         leftEarOsc.frequency.value = Math.round(baseFreq + (beatFreq / 2));
//         rightEarOsc.frequency.value = Math.round(baseFreq - (beatFreq / 2));

//         let gainNode = audioContext.createGain();
//         gainNode.gain.value = vol;

//         let leftStereoPanner = audioContext.createStereoPanner();
//         let rightStereoPanner = audioContext.createStereoPanner();

//         leftStereoPanner.pan.value = -1;
//         rightStereoPanner.pan.value = 1;

//         leftEarOsc.connect(leftStereoPanner);
//         rightEarOsc.connect(rightStereoPanner);

//         leftStereoPanner.connect(gainNode);
//         rightStereoPanner.connect(gainNode);

//         gainNode.connect(audioContext.destination);


//         leftEarOsc.start();
//         rightEarOsc.start();
// }



// function pauseMusic() {
//       if(leftEarOsc!=null){
//       leftEarOsc.stop();}

//       if(rightEarOsc!=null){
//       rightEarOsc.stop();}
// }


let isPlayingMusic = false;
function toggleMusic() {
  if (!isPlayingMusic) {
    let baseFreq = parseInt(document.getElementById('baseFre').value);
    let beatFreq = parseInt(document.getElementById('beatsFre').value);
    let vol = parseFloat(document.getElementById('volume').value);
    // console.log(baseFreq);
    // console.log(beatFreq);
    // console.log(vol);
    //   playMusic(baseFreq, beatFreq, vol);
    chrome.tabs.query({  }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        text: "play",
        parameter1: baseFreq,
        parameter2: beatFreq,
        parameter3: vol
      });
    });
  }
  else {
    //    pauseMusic();
    let baseFreq = parseInt(document.getElementById('baseFre').value);
    let beatFreq = parseInt(document.getElementById('beatsFre').value);
    let vol = parseFloat(document.getElementById('volume').value);
    chrome.tabs.query({  }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        text: "pause",
        parameter1: baseFreq,
        parameter2: beatFreq,
        parameter3: vol
      });
    });
  }
  isPlayingMusic = !isPlayingMusic;
}
playPauseButton.addEventListener('click', toggleMusic);


//STORE DATA
// Store data to Chrome storage
// function storeData(baseFreq,beatFreq,vol) {
//   chrome.storage.sync.set({ 'popData':{baseFreq,beatFreq,vol} });
// }


// Retrieve data from Chrome storage
function retrieveData() {
  chrome.storage.sync.get(['popData'], function (result) {
    // console.log('Data retrieved successfully:', result.popData);

    document.getElementById('baseFre').value = result.popData.baseFreq;
    document.getElementById('beatsFre').value = result.popData.beatFreq;
    document.getElementById('volume').value = result.popData.vol;
    isPlayingMusic = result.popData.bool;
    isPlaying = !(result.popData.bool);
    togglePlayPause();
    base.innerHTML = "Base frequency : " + result.popData.baseFreq + " Hz";
    beat.innerHTML = "Beats frequency : " + result.popData.beatFreq + " Hz";
    vo.innerHTML = "Volume : " + Math.round((result.popData.vol / .50) * 100);
  });
}
retrieveData();


let base = document.getElementById('a');
let beat = document.getElementById('b');
let vo = document.getElementById('c');
let baseF = document.getElementById('baseFre');
let beatF = document.getElementById('beatsFre');
let vF = document.getElementById('volume');

baseF.addEventListener('input', function () {
  base.innerHTML = "Base frequency : " + baseF.value + " Hz";
  if (isPlaying) {
    changeFre();
  }
});
beatF.addEventListener('input', function () {
  beat.innerHTML = "Beats frequency : " + beatF.value + " Hz";
  if (isPlaying) {
    changeFre();
  }
});
vF.addEventListener('input', function () {
  vo.innerHTML = "Volume : " + Math.round((vF.value / .50) * 100);
  if (isPlaying) {
    changeFre();
  }
});


function changeFre() {
  chrome.tabs.query({  }, function (tabs) {
    let baseFreq = parseInt(document.getElementById('baseFre').value);
    let beatFreq = parseInt(document.getElementById('beatsFre').value);
    let vol = parseFloat(document.getElementById('volume').value);
    chrome.tabs.sendMessage(tabs[0].id, {
        text: "changeVol",
        parameter1: baseFreq,
        parameter2: beatFreq,
        parameter3: vol
    });
  });
}


// MEDITATION PAGE
const medi=document.getElementById("medi");
medi.addEventListener('click',()=>{
  chrome.runtime.sendMessage({ action: "openNewTab", url: "page/index.html" });
})
