let playPauseButton = document.getElementById('playPause');
let playPauseImage = document.getElementById('playPauseImg');
let isPlaying = false;
// function for toggle play of pic  
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


// Audio
{
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
}


// AudioContext
{
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
}


let tab_id = null;
let isPlayingMusic = false;
// function for toggle music 
function toggleMusic() {
  // sending message for play , pause -> play
  if (!isPlayingMusic) {    // isPlayingMusic = false, pause -> play
    let baseFreq = parseInt(document.getElementById('baseFre').value);
    let beatFreq = parseInt(document.getElementById('beatsFre').value);
    let vol = parseFloat(document.getElementById('volume').value);
    
    chrome.tabs.query({}, function (tabs) {
      let flag1 = true;     // when no medetation tab is opened
      for (let index = 0; index < tabs.length; index++) {
        if (tabs[index].url.includes("https://ghosh-trisha.github.io/Binaural_Beats_Project/page/index.html")) {
          flag1 = false;    // when atleast one medetation tab is opened
        }

      }
      if (flag1) {     // when no medetation tab is opened
        chrome.runtime.sendMessage({ action: "openNewTab", url: "https://ghosh-trisha.github.io/Binaural_Beats_Project/page/index.html" });
      }
      else {     // when atleast one medetation tab is opened
        let tabId = null;
        for (let index = 0; index < tabs.length; index++) {
          if (tabs[index].url.includes("https://ghosh-trisha.github.io/Binaural_Beats_Project/page/index.html")) {
            tabId = tabs[index].id;
          }

        }
        // sending message for play
        chrome.tabs.sendMessage(tabId || tabs[0].id, {
          text: "play",
          parameter1: baseFreq,
          parameter2: beatFreq,
          parameter3: vol
        });
      }
    })
  }
  // sending message for pause , play -> play
  else {        // isPlayingMusic = true, play -> pause

    let baseFreq = parseInt(document.getElementById('baseFre').value);
    let beatFreq = parseInt(document.getElementById('beatsFre').value);
    let vol = parseFloat(document.getElementById('volume').value);
    chrome.tabs.query({}, function (tabs) {
      let tabId = null;
      for (let index = 0; index < tabs.length; index++) {
        if (tabs[index].url.includes("https://ghosh-trisha.github.io/Binaural_Beats_Project/page/index.html")) {
          tabId = tabs[index].id;
        }
      }
      // sending message for pause
      chrome.tabs.sendMessage(tabId || tabs[0].id, {
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
  // retrieveId();
  chrome.tabs.query({}, function (tabs) {
    let tabId = null;
    for (let index = 0; index < tabs.length; index++) {
      if (tabs[index].url.includes("https://ghosh-trisha.github.io/Binaural_Beats_Project/page/index.html")) {
        tabId = tabs[index].id;
      }

    }
    console.log(tabId);
    let baseFreq = parseInt(document.getElementById('baseFre').value);
    let beatFreq = parseInt(document.getElementById('beatsFre').value);
    let vol = parseFloat(document.getElementById('volume').value);
    chrome.tabs.sendMessage(tabId || tabs[0].id, {
      text: "changeVol",
      parameter1: baseFreq,
      parameter2: beatFreq,
      parameter3: vol
    });
  });
}


// MEDITATION PAGE
const medi = document.getElementById("medi");
medi.addEventListener('click', () => {
  chrome.tabs.query({}, function (tabs) {
    let flag1 = true;
    for (let index = 0; index < tabs.length; index++) {
      if (tabs[index].url.includes("https://ghosh-trisha.github.io/Binaural_Beats_Project/page/index.html")) {
        flag1 = false;
      }

    }
    if (flag1) {
      chrome.runtime.sendMessage({ action: "openNewTab", url: "https://ghosh-trisha.github.io/Binaural_Beats_Project/page/index.html" });
    }else{
      chrome.tabs.query({ url: "https://ghosh-trisha.github.io/Binaural_Beats_Project/page/index.html" }, function (tabs) {
        if (tabs.length > 0) {
          chrome.tabs.update(tabs[0].id, { active: true });
        }
      });
    }
  })
})
