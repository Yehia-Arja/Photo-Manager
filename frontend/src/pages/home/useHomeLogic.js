import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    fetchPhotosThunk,
    addPhotoThunk,
    softDeletePhotoThunk
} from "../../state/redux/photoSlice.js";

const useHomeLogic = () => {
    const { photos, loading, error } = useSelector((state) => state.photos);
    const dispatch = useDispatch();

    const handleGetPhotos = () => {
        dispatch(fetchPhotosThunk('photos'));
    };

    useEffect(() => {
        handleGetPhotos();
    }, []);

       
    const handleAddPhoto = () => {
        dispatch(addPhotoThunk());
    };

    const handleSoftDelete = (photoPath) => {
        dispatch(softDeletePhotoThunk(photoPath));
    };

    return {
        photos,
        loading,
        error,
        handleAddPhoto,
        handleSoftDelete,
    };
};

export default useHomeLogic;
