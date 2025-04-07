import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    load,
    getPhotos, 
    failure, 
    addPhoto, 
    softDelete,
} from "../../state/redux/photoSlice.js";   

const useHomeLogic = () => {
    const { photos, loading, error } = useSelector((state) => state.photos);
    const dispatch = useDispatch();

    const handleGetPhotos = async () => {
        dispatch(load());
        try {
            const photosData = await window.electronAPI.getPhotos('photos');
            dispatch(getPhotos(photosData));
        } catch (error) {
            dispatch(failure(error.message));
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
            dispatch(failure(error.message));
        }
    };

    const handleSoftDelete = async (photoPath) => {
        dispatch(load());
        try {
            const newPath = await window.electronAPI.softDelete(photoPath);
            dispatch(softDelete({newPath,photoPath}));
        } catch (error) {
            dispatch(failure(error.message));
        }
    };

    return {
        photos,
        loading,
        error,
        handleGetPhotos,
        handleAddPhoto,
        handleSoftDelete,
    };
};

export default useHomeLogic;
