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
        load: (state) => {
            state.loading = true;
        },
        getPhotosSuccess: (state, action) => {
            state.loading = false;
            state.photos = action.payload;
        },
        getPhotosFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addPhoto: (state, action) => {
            state.photos.push(action.payload);
        },
        deletePhoto: (state, action) => {
            state.photos = state.photos.filter(photo => photo !== action.payload);
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

export default photoSlice.reducer;