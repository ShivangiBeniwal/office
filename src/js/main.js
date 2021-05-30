'use strict';
const logTag = "Live Stream"

/* globals MediaRecorder */

let mediaRecorder;
let recordedBlobs;

const codecPreferences = document.querySelector('#codecPreferences');
const errorMsgElement = document.querySelector('span#errorMsg');
const recordedVideo = document.querySelector('video#recorded');
const liveVideo = document.querySelector('video#live');

const recordButton = document.querySelector('button#record');
recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
    codecPreferences.disabled = false;
  }
});

const playButton = document.querySelector('button#play');
playButton.addEventListener('click', () => {
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value.split(';', 1)[0];
  const superBuffer = new Blob(recordedBlobs, {type: mimeType});
  recordedVideo.src = null;
  recordedVideo.srcObject = null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
});

const downloadButton = document.querySelector('button#download');
downloadButton.addEventListener('click', () => {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
});

function handleDataAvailable(event) {
  printLog(`handleDataAvailable ${JSON.stringify(event)}`);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function getSupportedMimeTypes() {
  const possibleTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264,opus',
    'video/mp4;codecs=h264,aac'
  ];
  return possibleTypes.filter(mimeType => {
    return MediaRecorder.isTypeSupported(mimeType);
  });
}

function startRecording() {
  recordedBlobs = [];
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
  const options = {mimeType};

  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    printLog(`Exception while creating MediaRecorder : ${JSON.stringify(e)}`);
    return;
  }

  printLog(`Created MediaRecorder ${mediaRecorder.toString()} with options ${JSON.stringify(options)}`);
  recordButton.textContent = 'Stop Recording';

  playButton.disabled = true;
  downloadButton.disabled = true;
  codecPreferences.disabled = true;

  mediaRecorder.onstop = (event) => {
    printLog(`Recorder stopped : ${JSON.stringify(event)}`);
    printLog(`Recorded Blobs : ${recordedBlobs.toString()}`);
  };

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  printLog(`MediaRecorder started : ${mediaRecorder.toString()}`);
}

function stopRecording() {
  mediaRecorder.stop();
}

function printLog(msg) {
    var finalMessage = "[" + getCurrentDateTime() + "] " + msg;
    var p = document.createElement("p");
    p.innerText = finalMessage;
    errorMsgElement.insertBefore(p, errorMsgElement.firstChild);
}

function handleSuccess(stream) {
  recordButton.disabled = false;
  printLog(`getUserMedia() got stream : ${stream.toString()}`);

  window.stream = stream;
  liveVideo.srcObject = stream;

  getSupportedMimeTypes().forEach(mimeType => {
    const option = document.createElement('option');
    option.value = mimeType;
    option.innerText = option.value;
    codecPreferences.appendChild(option);
  });
  codecPreferences.disabled = false;
}

async function init(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    printLog(`navigator.getUserMedia error : ${e.toString()}`);
  }
}

const startButton = document.querySelector('button#start');
const togglePipButton = document.querySelector('button#pip');

startButton.addEventListener('click', async () => {
  startButton.disabled = true;
  togglePipButton.disabled = false;
  const constraints = {
    audio: {
      echoCancellation: {exact: true}
    },
    video: {
      width: 1280, height: 720
    }
  };
  printLog(`Using media constraints : ${JSON.stringify(constraints)}`);
  await init(constraints);
});

togglePipButton.addEventListener("click", async () => {
    try {
      if (liveVideo !== document.pictureInPictureElement)
        await liveVideo.requestPictureInPicture();
      else await document.exitPictureInPicture();
    } catch (error) {
      printLog(`> Argh! ${error}`);
    }
  });