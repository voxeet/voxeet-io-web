const { MediaEngine, VideoRenderer } = require('@voxeet/media-engine/electron');
global.MediaEngine = MediaEngine;
global.VideoRenderer = VideoRenderer;
window.voxeetNodeModule = true;