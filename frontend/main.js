import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import * as photoManager from './photoManager.js'

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

    ipcMain.handle('photos:get', async () => photoManager.getPhotos());
    ipcMain.handle('photos:save', async (event, photo) => photoManager.savePhoto(photo));
    ipcMain.handle('photos:delete', async (event, photo) => photoManager.deletePhoto(photo));

});







