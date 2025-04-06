const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getPath: () => ipcRenderer.invoke('photos:getPath'),
    getPhotos: () => ipcRenderer.invoke('photos:get'),
    addPhoto: (sourceFilePath) => ipcRenderer.invoke('photos:add', sourceFilePath),
    deletePhoto: (photoPath) => ipcRenderer.invoke('photos:delete', photoPath),
});
