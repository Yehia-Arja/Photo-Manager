import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    photos: [],
    recentlyDeleted: [],
    loading: false,
    error: null,
}

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        load: (current) => {
            return {
                ...current,
                loading: true,
            }
        },
        getPhotosSuccess: (current, action) => {
            return {
                ...current,
                loading: false,
                photos: action.payload,
            }
        },
        failure: (current, action) => {
            return {
                ...current,
                loading: false,
                error: action.payload,
            }
        },
        addPhoto: (current, action) => {
            return {
                ...current,
                photos: [...current.photos, action.payload],
            }
        },
        softDelete: (current, action) => {
            return {
                ...current,
                photos: current.photos.filter(photo => photo !== action.payload.photoPath),
                recentlyDeleted: [...current.recentlyDeleted, action.payload.newPath],
            }
        },
        restorePhoto: (current, action) => {
            return {
                ...current,
                recentlyDeleted: current.recentlyDeleted.filter(photo => photo !== action.payload.photoPath),
                photos: [...current.photos, action.payload.newPath],
            }
        },
        deletePhoto: (current, action) => {
            return {
                ...current,
                recentlyDeleted: current.recentlyDeleted.filter(photo => photo !== action.payload),
            }
        },
    }
})

export const {
    load, 
    getPhotosSuccess, 
    failure, 
    addPhoto, 
    softDelete,
    restorePhoto,
    deletePhoto 
} = photoSlice.actions;

export default photoSlice;