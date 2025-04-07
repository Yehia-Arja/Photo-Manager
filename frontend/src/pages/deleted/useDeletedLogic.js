import { useEffect } from "react";
import { restorePhoto,deletePhoto, load, failure, getRecentlyDeletedPhotos } from "../../state/redux/photoSlice.js";
import { useDispatch, useSelector } from "react-redux";

const useDeletedLogic = () => {
    const { recentlyDeleted } = useSelector((state) => state.photos);
    const dispatch = useDispatch();

    const handleGetRecentlyDeleted = async () => {
        dispatch(load());
        try {
            const photosData = await window.electronAPI.getPhotos('deleted');
            dispatch(getRecentlyDeletedPhotos(photosData));
        } catch (error) {
            dispatch(failure(error.message));
        }
    }
    useEffect(() => {
        handleGetRecentlyDeleted();
    }, []);

    const handleRestorePhoto = async (photoPath) => {
        dispatch(load());
        try {
            const newPath = await window.electronAPI.restorePhoto(photoPath);
            dispatch(restorePhoto({photoPath,newPath}));
        }catch (error) {
            dispatch(failure(error.message));
        }
       
    };

    const handleDeletePhoto = async (photoPath) => {
        dispatch(load());
        try {
            await window.electronAPI.deletePhoto(photoPath);
            dispatch(deletePhoto(photoPath));
        } catch (error) {
            dispatch(failure(error.message));
        }
    };

    return {
        recentlyDeleted,
        handleRestorePhoto,
        handleDeletePhoto,
    };
}

export default useDeletedLogic;