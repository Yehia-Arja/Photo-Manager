import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    load,
    getPhotosSuccess, 
    getPhotosFailure, 
    addPhoto, 
    deletePhoto 
} from "../../state/redux/photoSlice.js";   

const useHomeLogic = () => {
    const { photos, loading, error } = useSelector((state) => state.photos);
    const dispatch = useDispatch();

    const handleGetPhotos = async () => {
        dispatch(load());
        try {
            const photosData = await window.electronAPI.getPhotos();
            dispatch(getPhotosSuccess(photosData));
        } catch (error) {
            dispatch(getPhotosFailure(error.message));
        }
    };

    useEffect(() => {
        handleGetPhotos();
    }, []);

    const handleAddPhoto = async () => {
        dispatch(load()); 
        try {
            const filePath = await window.electronAPI.getPath();
            if (!filePath) return;
            console.log("Adding photo:", filePath);
            const newPhoto = await window.electronAPI.addPhoto(filePath);
            dispatch(addPhoto(newPhoto));
        } catch (error) {
            console.error("Error adding photo:", error);
        }
    };

    const handleDeletePhoto = async (photoPath) => {
        dispatch(load());
        try {
            await window.electronAPI.deletePhoto(photoPath);
            dispatch(deletePhoto(photoPath));
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    return {
        photos,
        loading,
        error,
        handleGetPhotos,
        handleAddPhoto,
        handleDeletePhoto,
    };
};

export default useHomeLogic;
