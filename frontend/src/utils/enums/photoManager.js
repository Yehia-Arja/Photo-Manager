import fs from 'fs';
import path from 'path';
import { app, dialog } from 'electron';
import { Buffer } from 'buffer';

const photosDir = path.join(app.getPath('userData'), 'photos');
const deletedDir = path.join(app.getPath('userData'), 'recently_deleted');

const dirs = {
    photos: photosDir,
    deleted: deletedDir,
};

if (!fs.existsSync(deletedDir)) {
    fs.mkdirSync(deletedDir, { recursive: true });
}
if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir, { recursive: true });
}

export const getPhotos = (type) => {
    try {
        const dir = dirs[type] ?? null;
        if (!dir) {
            throw new Error('Invalid directory type');
        }
        const files = fs.readdirSync(dir);

        return files.map(file => path.join(dir, file));
    } catch (error) {
        console.error('Error reading photos:', error);
        return [];
    }
};

export const addPhoto = (photoPath) => {
    try {
        const originalName = path.basename(photoPath);
        const now = Date.now();
        const newName = `${now}-${originalName}`;
        const destination = path.join(photosDir, newName);
        fs.copyFileSync(photoPath, destination);

        return destination;
    } catch (error) {
        console.error('Error saving photo:', error);
        throw error;
    }
};

export const softDelete = (photoPath) => {
    try {
        const photoName = path.basename(photoPath);
        const destination = path.join(deletedDir, photoName);
        fs.renameSync(photoPath, destination);

        return destination;
    } catch (error) {
        console.error('Error moving photo to recently deleted folder:', error);
        throw error;
    }
};

export const restorePhoto = (photoPath) => {
    try {
        const photoName = path.basename(photoPath);
        const destination = path.join(photosDir, photoName);
        fs.renameSync(photoPath, destination);
        
        return destination;
    } catch (error) {
        console.error('Error restoring photo:', error);
        throw error;
    }
};

export const deletePhoto = (photoPath) => {
    try {
        fs.unlinkSync(photoPath);
    } catch (error) {
        console.error('Error deleting photo:', error);
        throw error;
    }
};

export const getPath = async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }],
    });
    return result.canceled ? null : result.filePaths[0];
};


export const saveEditedImage = (photoPath, dataUrl) => {
	try {
		const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
		if (!match) {
			throw new Error("Invalid base64 image format");
		}

		const base64Data = match[2];
		const buffer = Buffer.from(base64Data, "base64");

        fs.writeFileSync(photoPath, buffer);
        
		return { photoPath };
	} catch (err) {
		console.error("Error saving edited image:", err);
		throw err;
	}
};

