const { app, BrowserWindow, Menu, ipcMain, powerSaveBlocker } = require('electron');
//const Splahscreen =  require("@trodi/electron-splashscreen");
const path = require('path');
const url = require('url');

const isDevelopment = process.env.NODE_ENV === 'development';

app.commandLine.appendSwitch("enable-accelerated-mjpeg-decoder", 'true');
app.commandLine.appendSwitch("enable-accelerated-video", 'true');
app.commandLine.appendSwitch("enable-gpu-rasterization", 'true');
app.commandLine.appendSwitch("enable-native-gpu-memory-buffers", 'true');
app.commandLine.appendSwitch("ignore-gpu-blacklist", 'true');
app.commandLine.appendSwitch('usegl', 'egl');
app.commandLine.appendSwitch('enable-logging', 'true');
app.commandLine.appendSwitch('v','1');
app.commandLine.appendSwitch('num-raster-threads', 2)
app.commandLine.appendSwitch('enable-zero-copy', 'true');
app.commandLine.appendSwitch('enable-gpu-memory-buffer-compositor-resources', 'true');
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

if (process.platform === 'darwin') {
  const env = {}
  env.PATH = ["$PATH"].join(':');
  env.DYLD_LIBRARY_PATH = ['$DYLD_LIBRARY_PATH', path.join(process.resourcesPath, "libraries")].join(':');

  Object.assign(process.env, env);
}

const template = [{
  label: "Application",
  submenu: [
      { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
  ]}, {
  label: "Edit",
  submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
  ]}
];

let mainWindow;

app.on('window-all-close', () => {
  mainWindow.close();
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 1280, height: 720});
  mainWindow.webContents.setFrameRate(30);
  
  ipcMain.on('leave', (e) => {
    mainWindow.close();
    app.quit();
  });

  if (isDevelopment) {
    mainWindow.loadURL(`https://localhost.voxeet.com:8081`);
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../dist', 'index.html'),
      protocol: 'file:',
      slashes: false
    }));
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  
  // Debugging purpose
  if (process.env.DEBUG) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });
});