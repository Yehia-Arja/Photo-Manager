import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    photos: [],
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
        getPhotosFailure: (current, action) => {
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
        deletePhoto: (current, action) => {
            return {
                ...current,
                photos: current.photos.filter(photo => photo !== action.payload),
            }
        },
    }
})

export const {
    load, 
    getPhotosSuccess, 
    getPhotosFailure, 
    addPhoto, 
    deletePhoto 
} = photoSlice.actions;

export default photoSlice;