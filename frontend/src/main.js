const {app, BrowserWindow, Menu, ipcMain, powerSaveBlocker, systemPreferences, dialog, shell} = require('electron');
//const Splahscreen =  require("@trodi/electron-splashscreen");
const path = require('path');
const url = require('url');
const windowStateKeeper = require('electron-window-state');

let arguments = process.argv;

const isDevelopment = arguments && arguments.indexOf('debug') !== -1;
// const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
//  app.commandLine.appendSwitch('no-sandbox', 'false');
    app.commandLine.appendSwitch('enable-logging', 'true');
}
app.commandLine.appendSwitch("enable-accelerated-mjpeg-decoder", 'true');
app.commandLine.appendSwitch("enable-accelerated-video", 'true');
app.commandLine.appendSwitch("enable-gpu-rasterization", 'true');
app.commandLine.appendSwitch("enable-native-gpu-memory-buffers", 'true');
app.commandLine.appendSwitch("ignore-gpu-blacklist", 'true');
app.commandLine.appendSwitch('usegl', 'egl');
app.commandLine.appendSwitch('v', '1');
app.commandLine.appendSwitch('num-raster-threads', 2)
app.commandLine.appendSwitch('enable-zero-copy', 'true');
app.commandLine.appendSwitch('enable-gpu-memory-buffer-compositor-resources', 'true');
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
//app.enableSandbox()

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
let powerId = null;

async function askForMediaAccess(media) {
    try {
        console.log('process.platform', process.platform)
        if (process.platform !== "darwin") { return true; }
        const status = await systemPreferences.getMediaAccessStatus(media);
        console.log(`Current ${media} access status:`, status);

        if (status !== "granted") {
            const success = await systemPreferences.askForMediaAccess(media);
            console.log(`Current ${media} access status:`, success.valueOf() ? "granted" : "denied");
            return success.valueOf();
        }

        return status === "granted";
    } catch (error) {
        dialog.showMessageBox(null, { message: "Could not get " + media + " permission: " + error.message });
    }

    return false;
}

app.on('window-all-close', () => {
  mainWindow.close();
  app.quit();
});

app.on('ready', async () => {

  await askForMediaAccess("microphone");
  await askForMediaAccess("camera");

    // const winBounds = win.getBounds();
    // const distScreen = screen.getDisplayNearestPoint({x: winBounds.x, y: winBounds.y})
  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1440,
    defaultHeight: 960
  });

  mainWindow = new BrowserWindow({
      x: mainWindowState.x,
      y: mainWindowState.y,
      width: mainWindowState.width,
      height: mainWindowState.height,
      webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          preload: path.join(__dirname, "preload.js")
      }
  });

    ipcMain.on('conferenceJoined', (e) => {
        // console.log('conference joined');
        try {
            powerId = powerSaveBlocker.start("prevent-display-sleep"); // CCS-1857
        } catch(e) {
            console.error('Could not start power save blocker', e.message);
        }
    });

    ipcMain.on('conferenceLeft', (e) => {
        // console.log('conference left');
        try {
            if (powerId !== null) {
                powerSaveBlocker.stop(powerId);
            }
            powerId = null;
        } catch(e) {
            console.error('Could not stop power save blocker', e.message);
        }
    });

  ipcMain.on('leave', (e) => {
    mainWindow.close();
    app.quit();
  });

  indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, '..', 'dist', 'index.html'),
      slashes: true
  })

  // Load the index.html
  mainWindow.loadURL(indexPath)

    //  mainWindow.loadURL(`https://localhost.voxeet.com:8081`);
    // mainWindow.loadURL(`https://voxeet-io.dev.trydcc.com/staging`);
   // mainWindow.loadURL(url.format({
   //     pathname: path.join(__dirname, '../dist', 'index.html'),
   //   protocol: 'file:',
   //   slashes: false
   // }));

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    if (isDevelopment) {

        // Debugging purpose
        // if (1||process.env.DEBUG) {
        mainWindow.webContents.openDevTools();
        // }

        const createWindow =(filePath) => {
            const win = new BrowserWindow({
                width: 800,
                height: 600,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })

            win.loadURL(filePath)
        }

        createWindow('chrome://webrtc-internals')
        // createWindow('chrome://sandbox')
        createWindow('chrome://tracing')
    } else {

    }

  var handleRedirect = (e, url) => {
    if (url != mainWindow.webContents.getURL()) {
      e.preventDefault()
      shell.openExternal(url)
    }
  }
  mainWindow.webContents.on('new-window', handleRedirect)
  mainWindow.webContents.on('will-navigate', handleRedirect)

  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });

  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(mainWindow);
});