import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    fetchPhotosThunk,
    restorePhotoThunk,
    deletePhotoThunk,
} from "../../state/redux/photoSlice.js";

const useRecentlyDeletedLogic = () => {
    const { recentlyDeleted, loading, error } = useSelector((state) => state.photos);
    const dispatch = useDispatch();

    const handleGetRecentlyDeleted = () => {
        dispatch(fetchPhotosThunk('deleted'));
    };

    useEffect(() => {
        handleGetRecentlyDeleted();
    }, []);

    const handleRestorePhoto = (photoPath) => {
        dispatch(restorePhotoThunk(photoPath));
    };

    const handleDeletePhoto = (photoPath) => {
        dispatch(deletePhotoThunk(photoPath));
    };

    return {
        recentlyDeleted,
        loading,
        error,
        handleRestorePhoto,
        handleDeletePhoto,
    };
};

export default useRecentlyDeletedLogic;
