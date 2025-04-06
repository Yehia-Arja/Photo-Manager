import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: false,
    }
  })
  win.loadFile(path.join(dirName, 'dist', 'index.html'))
}

app.whenReady().then(createWindow);







