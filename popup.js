
let playPauseButton = document.getElementById('playPause');
// let playPauseImage = document.getElementById('playPauseImg');
let isPlaying = false;

function togglePlayPause() {
  if (isPlaying) {
    playPauseButton.textContent = 'Play';
    // playPauseImage.src = 'play.jpg';
  } else {
    playPauseButton.textContent = 'Pause';
    // playPauseImage.src = 'pause.jpeg';
  }
  isPlaying = !isPlaying;
}

playPauseButton.addEventListener('click', togglePlayPause);