
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



let audioContext = new AudioContext();
const audioFileURL="song.mp3";

let source;
function playAudio(audioBuffer) {
  source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
}
function stopAudio() {
  if (source) {
    source.stop();
    source.disconnect(); // Disconnect the source node
  }
}
let isPlayingAudioContext = false;
function playAudioContext() {
    if (!isPlayingAudioContext) {
      fetch(audioFileURL)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        playAudio(audioBuffer);
      })
      .catch(error => console.error('Error loading audio file:', error));
    } else {
      stopAudio()
    }
    isPlayingAudioContext = !isPlayingAudioContext;
}
playPauseButton.addEventListener('click', playAudioContext);

// let baseFreq = document.getElementById('baseFre').value;
// let beatFreq = document.getElementById('beatsFre').value;
// let vol = document.getElementById('volume').value;

// let leftEarOsc = audioContext.createOscillator();
// let rightEarOsc = audioContext.createOscillator();

// leftEarOsc.type = "sine";
// rightEarOsc.type = "sine";

// leftEarOsc.frequency.value = Math.round((baseFreq+beatFreq)/5);
// rightEarOsc.frequency.value = Math.round((baseFreq-beatFreq)/5);

// let gainNode = audioContext.createGain();
// gainNode.gain.value = vol;

// leftEarOsc.connect(gainNode);
// rightEarOsc.connect(gainNode);

// gainNode.connect(audioContext.destination);


// let isPlayingMusic = false;
// function playMusic() {
//     if (!isPlayingMusic) {
//         leftEarOsc.start();
//         rightEarOsc.start();
//     } else {
//         leftEarOsc.stop();
//         rightEarOsc.stop();
//     }
//     isPlayingMusic = !isPlayingMusic;
//   }
//   playPauseButton.addEventListener('click', playMusic);