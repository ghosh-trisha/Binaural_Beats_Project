// document.body.style.backgroundColor = "red";


// receiving the message for base frequency , beat frequency , volume
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // for playing the music
    if(message.text == "play"){
      let baseFreq = message.parameter1;
      let beatFreq = message.parameter2;
      let vol = message.parameter3;
      playMusic(baseFreq, beatFreq, vol);
    }
    // for pausing the music
    if(message.text == "pause"){
        let baseFreq = message.parameter1;
        let beatFreq = message.parameter2;
        let vol = message.parameter3;
        pauseMusic(baseFreq, beatFreq, vol);
    }
    // for changing base frequency , beat frequency , volume of the music
    if(message.text == "changeVol"){
        let baseFreq = message.parameter1;
        let beatFreq = message.parameter2;
        let vol = message.parameter3;
        gainNode.gain.value = vol;
        leftEarOsc.frequency.value = Math.round(baseFreq + (beatFreq / 2));
        rightEarOsc.frequency.value = Math.round(baseFreq - (beatFreq / 2));

    }

});


let audioContext = null;
// Function to create or resume AudioContext
function createOrResumeAudioContext() {
    if (!audioContext) {
        audioContext = new AudioContext();
    } else if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}


let leftEarOsc = null;
let rightEarOsc= null;
let gainNode=null;
// function for playing the music
function playMusic(baseFreq, beatFreq, vol) {
    
    createOrResumeAudioContext();
    storeData(baseFreq,beatFreq,vol, true);

    leftEarOsc = audioContext.createOscillator();
    rightEarOsc = audioContext.createOscillator();

    leftEarOsc.type = "sine";
    rightEarOsc.type = "sine";

  leftEarOsc.frequency.value = Math.round(baseFreq + (beatFreq / 2));
  rightEarOsc.frequency.value = Math.round(baseFreq - (beatFreq / 2));

  gainNode = audioContext.createGain();
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


// function for pausing the music
function pauseMusic(baseFreq, beatFreq, vol) {
    if(leftEarOsc!=null){
    leftEarOsc.stop();}

    if(rightEarOsc!=null){
    rightEarOsc.stop();}

    storeData(baseFreq, beatFreq, vol, false);
}


// function for storing base frequency , beat frequency , volume , bool
// bool = true , if the music is playing
// bool = false , if the music is not playing
function storeData(baseFreq, beatFreq, vol, bool) {
    chrome.storage.sync.set({ 'popData':{baseFreq, beatFreq, vol, bool} });
}


