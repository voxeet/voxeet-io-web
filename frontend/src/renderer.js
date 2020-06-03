const { ipcRenderer } = require('electron');
const { MediaEngine, VideoRenderer } = require('@voxeet/media-engine/electron');
global.MediaEngine = MediaEngine;
global.VideoRenderer = VideoRenderer;
window.voxeetNodeModule = true;

global.electronOnJoined = () => {
  ipcRenderer.send('conferenceJoined');
}

global.electronOnLeft = () => {
  ipcRenderer.send('conferenceLeft');
}