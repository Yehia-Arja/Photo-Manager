import fs from 'fs';
import path from 'path';
import { app } from 'electron';

const photosDir = path.join(app.getPath('userData'), 'photos');

if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}

export const readPhotos = () => {
    try {
        const files = fs.readdirSync(photosDir);
        return files.map(file => path.join(photosDir, file));
    }catch (error) {
        console.error('Error reading photos:', error);
        return [];
    }
}

export const savePhoto = (photo) => {
    try {
        const destination = path.join(photosDir, path.basename(photo));
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