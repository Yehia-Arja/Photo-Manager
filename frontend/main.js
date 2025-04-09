import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import * as photoManager from './utils/enums/photoManager.js';


const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
        preload: path.join(dirName, 'preload.js'),
        contextIsolation: true,
        }
    })
    win.loadFile(path.join(dirName, 'dist', 'index.html'))
}

app.whenReady().then(() => {
    createWindow();
  
    ipcMain.handle('photos:getPath', async () => photoManager.getPath());
    ipcMain.handle('photos:get', async (event,type) => photoManager.getPhotos(type));
    ipcMain.handle('photos:add', async (event,photo) => photoManager.addPhoto(photo));
    ipcMain.handle('photos:softDelete', async (event,photo) => photoManager.softDelete(photo));
    ipcMain.handle('photos:restore', async (event,photo) => photoManager.restorePhoto(photo));
    ipcMain.handle('photos:delete', async (event,photo) => photoManager.deletePhoto(photo));

});







