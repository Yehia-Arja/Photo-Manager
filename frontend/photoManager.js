import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { dialog } from 'electron';

const photosDir = path.join(app.getPath('userData'), 'photos');

if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir, { recursive: true });
}

export const getPhotos = () => {
    try {
        const files = fs.readdirSync(photosDir);
        return files.map(file => path.join(photosDir, file));
    }catch (error) {
        console.error('Error reading photos:', error);
        return [];
    }
}

export const addPhoto = (photo) => {
    try {
        
        const originalName = path.basename(photo);
        const now = Date.now();
        const newName = `${now}-${originalName}`;
        const destination = path.join(photosDir, newName);        
        fs.copyFileSync(photo, destination);
        return destination;

    } catch (error) {
        console.error('Error saving photo:', error);
        throw error;
    }
}

export const deletePhoto = (photo) => {
    try {
        fs.unlinkSync(photo);
    } catch (error) {
        console.error('Error deleting photo:', error);
        throw error;
    }
}

export const getPath = async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }],
    });
    return result.canceled ? null : result.filePaths[0];
};
