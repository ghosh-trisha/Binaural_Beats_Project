// document.body.style.backgroundColor = "red";

let gainNode = null;
let leftEarOsc = null;
let rightEarOsc= null;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.text == "play"){
      let baseFreq = message.parameter1;
      let beatFreq = message.parameter2;
      let vol = message.parameter3;
    //   console.log(baseFreq);
    //   console.log(beatFreq);
    //   console.log(vol);
    //   console.log(message.text);
      playMusic(baseFreq, beatFreq, vol);
    }
    if(message.text == "pause"){
        let baseFreq = message.parameter1;
        let beatFreq = message.parameter2;
        let vol = message.parameter3;
        pauseMusic(baseFreq, beatFreq, vol);
    }
    if(message.text=="changeVol"){
        let baseFreq = message.parameter1;
        let beatFreq = message.parameter2;
        let vol = message.parameter3;
        leftEarOsc.frequency.value = Math.round(baseFreq + (beatFreq / 2));
        rightEarOsc.frequency.value = Math.round(baseFreq - (beatFreq / 2));
        gainNode.gain.value = vol;
    }
});

// let audioContext = new AudioContext();
let audioContext = null;
// Function to create or resume AudioContext
function createOrResumeAudioContext() {
    if (!audioContext) {
        audioContext = new AudioContext();
    } else if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}


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

  gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);


  leftEarOsc.start();
  rightEarOsc.start();
}

function pauseMusic(baseFreq, beatFreq, vol) {
    if(leftEarOsc!=null){
    leftEarOsc.stop();}

    if(rightEarOsc!=null){
    rightEarOsc.stop();}

    storeData(baseFreq, beatFreq, vol, false);
}

function storeData(baseFreq, beatFreq, vol, bool) {
    chrome.storage.sync.set({ 'popData':{baseFreq, beatFreq, vol, bool} });
}