// document.body.style.backgroundColor = "red";


let audioContext = new AudioContext();
let leftEarOsc = null;
let rightEarOsc= null;
function playMusic(baseFreq,beatFreq,vol) {
    storeData(baseFreq,beatFreq,vol);

    leftEarOsc = audioContext.createOscillator();
    rightEarOsc = audioContext.createOscillator();

    leftEarOsc.type = "sine";
    rightEarOsc.type = "sine";

  leftEarOsc.frequency.value = Math.round(baseFreq + (beatFreq / 2));
  rightEarOsc.frequency.value = Math.round(baseFreq - (beatFreq / 2));

  let gainNode = audioContext.createGain();
  gainNode.gain.value = vol;

  let leftStereoPanner = audioContext.createStereoPanner();
  let rightStereoPanner = audioContext.createStereoPanner();

  leftStereoPanner.pan.value = -1;
  rightStereoPanner.pan.value = 1;

  leftEarOsc.connect(leftStereoPanner);
  rightEarOsc.connect(rightStereoPanner);

  leftStereoPanner.connect(gainNode);
  rightStereoPanner.connect(gainNode);

  gainNode.connect(audioContext.destination);


  leftEarOsc.start();
  rightEarOsc.start();
}

function pauseMusic() {
    if(leftEarOsc!=null){
    leftEarOsc.stop();}

    if(rightEarOsc!=null){
    rightEarOsc.stop();}
}

function storeData(baseFreq,beatFreq,vol) {
    chrome.storage.sync.set({ 'popData':{baseFreq,beatFreq,vol} });
  }