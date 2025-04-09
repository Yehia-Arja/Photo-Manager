import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PhotoService from '../../services/photoService.js';

// It accepts a type parameter to determine which photos to fetch (e.g., 'photos' or 'deleted').
export const fetchPhotosThunk = createAsyncThunk(
    'photos/fetchPhotos',
    async (type, { rejectWithValue }) => {
        try {
            const photosData = await PhotoService.fetchPhotos(type);
            console.log(photosData);
            return { type, photosData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Add a new photo to the collection.
export const addPhotoThunk = createAsyncThunk(
    'photos/addPhoto',
    async (_, { rejectWithValue }) => {
        try {
            const newPhoto = await PhotoService.addPhoto();
            return newPhoto;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Soft delete a photo by moving it to the "Recently Deleted" folder.
export const softDeletePhotoThunk = createAsyncThunk(
    'photos/softDelete',
    async (photoPath, { rejectWithValue }) => {
        try {
            const newPath = await PhotoService.softDelete(photoPath);
            return { photoPath, newPath };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Restore a soft-deleted photo by moving it back to the main photos folder.
export const restorePhotoThunk = createAsyncThunk(
    'photos/restorePhoto',
    async (photoPath, { rejectWithValue }) => {
        try {
            const newPath = await PhotoService.restorePhoto(photoPath);
            return { photoPath, newPath };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Permanently delete a photo from the "Recently Deleted" folder.
export const deletePhotoThunk = createAsyncThunk(
    'photos/deletePhoto',
    async (photoPath, { rejectWithValue }) => {
        try {
            await PhotoService.deletePhoto(photoPath);
            return photoPath;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    photos: [],
    recentlyDeleted: [],
    loading: false,
    error: null,
};

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle photo fetching
        builder.addCase(fetchPhotosThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPhotosThunk.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.type === 'photos') {
                state.photos = action.payload.photosData;
            } else if (action.payload.type === 'deleted') {
                state.recentlyDeleted = action.payload.photosData;
            }
        });
        builder.addCase(fetchPhotosThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle adding a photo
        builder.addCase(addPhotoThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addPhotoThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.photos.push(action.payload);
        });
        builder.addCase(addPhotoThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle soft deletion of a photo
        builder.addCase(softDeletePhotoThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(softDeletePhotoThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.photos = state.photos.filter(photo => photo !== action.payload.photoPath);
            state.recentlyDeleted.push(action.payload.newPath);
        });
        builder.addCase(softDeletePhotoThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle restoration of a photo
        builder.addCase(restorePhotoThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(restorePhotoThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.recentlyDeleted = state.recentlyDeleted.filter(photo => photo !== action.payload.photoPath);
            state.photos.push(action.payload.newPath);
        });
        builder.addCase(restorePhotoThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle permanent deletion of a photo
        builder.addCase(deletePhotoThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deletePhotoThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.recentlyDeleted = state.recentlyDeleted.filter(photo => photo !== action.payload);
        });
        builder.addCase(deletePhotoThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default photoSlice;
