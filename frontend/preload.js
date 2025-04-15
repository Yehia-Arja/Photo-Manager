const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	getPath: () => ipcRenderer.invoke('photos:getPath'),
	getPhotos: (type) => ipcRenderer.invoke('photos:get', type),
	addPhoto: (sourceFilePath) => ipcRenderer.invoke('photos:add', sourceFilePath),
	softDelete: (photoPath) => ipcRenderer.invoke('photos:softDelete', photoPath),
	restorePhoto: (photoPath) => ipcRenderer.invoke('photos:restore', photoPath),
	deletePhoto: (photoPath) => ipcRenderer.invoke('photos:delete', photoPath),
	saveEditedImage: (photoPath, base64Data) => ipcRenderer.invoke('photos:saveEditedImage', photoPath, base64Data)
});
