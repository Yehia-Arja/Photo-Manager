const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readPhotos: () => ipcRenderer.invoke('photos:read'),
  addPhoto: (sourceFilePath) => ipcRenderer.invoke('photos:add', sourceFilePath),
  deletePhoto: (photoPath) => ipcRenderer.invoke('photos:delete', photoPath),
});
