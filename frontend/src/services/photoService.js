const PhotoService = {
    fetchPhotos: async (type) => {
        try {
            return await window.electronAPI.getPhotos(type);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    addPhoto: async () => {
        try {
            const filePath = await window.electronAPI.getPath();
            if (!filePath) {
                throw new Error('No file selected.');
            }
            return await window.electronAPI.addPhoto(filePath);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    softDelete: async (photoPath) => {
        try {
            return await window.electronAPI.softDelete(photoPath);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    restorePhoto: async (photoPath) => {
        try {
            return await window.electronAPI.restorePhoto(photoPath);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deletePhoto: async (photoPath) => {
        try {
            return await window.electronAPI.deletePhoto(photoPath);
        } catch (error) {
            throw new Error(error.message);
        }
    },


    saveEditedImage: async (photoPath, base64Data) => {
        try {
            return await window.electronAPI.saveEditedImage(photoPath, base64Data);
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default PhotoService;
