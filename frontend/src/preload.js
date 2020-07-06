const {ipcRenderer, contextBridge, desktopCapturer} = require("electron");

global.electronOnJoined = () => {
    ipcRenderer.send("conferenceJoined");
};

global.electronOnLeft = () => {
    ipcRenderer.send("conferenceLeft");
};

contextBridge.exposeInMainWorld(
    'electron',
    {
        getSources: () => desktopCapturer
            .getSources({types: ["window", "screen"]})
            /*.then(async sources => {
                for (const source of sources) {
                    console.error("src", JSON.stringify(source));
                }
                return sources;
            })*/,
        electronOnJoined: () => ipcRenderer.send("conferenceJoined"),
        electronOnLeft: () => ipcRenderer.send("conferenceLeft"),
        electronOnLeave: () => ipcRenderer.send("leave")
    }
)
