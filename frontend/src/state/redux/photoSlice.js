import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PhotoService from "../../services/photoService.js";

export const fetchPhotosThunk = createAsyncThunk(
    "photos/fetchPhotos",
    async (type, { rejectWithValue }) => {
        try {
            const photosData = await PhotoService.fetchPhotos(type);
            return { type, photosData };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const addPhotoThunk = createAsyncThunk(
    "photos/addPhoto",
    async (_, { rejectWithValue }) => {
        try {
            return await PhotoService.addPhoto();
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const softDeletePhotoThunk = createAsyncThunk(
    "photos/softDelete",
    async (path, { rejectWithValue }) => {
        try {
            const newPath = await PhotoService.softDelete(path);
            return { path, newPath };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const restorePhotoThunk = createAsyncThunk(
    "photos/restorePhoto",
    async (path, { rejectWithValue }) => {
        try {
            const newPath = await PhotoService.restorePhoto(path);
            return { path, newPath };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const deletePhotoThunk = createAsyncThunk(
    "photos/deletePhoto",
    async (path, { rejectWithValue }) => {
        try {
            await PhotoService.deletePhoto(path);
            return path;
        } catch (e) {
            return rejectWithValue(e.message);
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
    name: "photos",
    initialState,
    extraReducers: (builder) => {
        // Fetching photos
        builder.addCase(fetchPhotosThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPhotosThunk.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.type === "photos") {
                state.photos = action.payload.photosData
            }
            else {
                state.recentlyDeleted = action.payload.photosData
            };
        });
        builder.addCase(fetchPhotosThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Adding a photo
        builder.addCase(addPhotoThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addPhotoThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.photos = [...state.photos, action.payload];
        });
        builder.addCase(addPhotoThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Soft deleting a photo
        builder.addCase(softDeletePhotoThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(softDeletePhotoThunk.fulfilled,(state, action) => {
            state.loading = false;
            state.photos = state.photos.filter((photo) => photo !== action.payload.path);
            state.recentlyDeleted = [...state.recentlyDeleted, action.payload.newPath];
        });
        builder.addCase(softDeletePhotoThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Restoring a photo
        builder.addCase(restorePhotoThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(restorePhotoThunk.fulfilled,(state, action) => {
            state.loading = false;
            state.recentlyDeleted = state.recentlyDeleted.filter((photo) => photo !== action.payload.path);
            state.photos = [...state.photos, action.payload.newPath];
        });
        builder.addCase(restorePhotoThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Deleting a photo
        builder.addCase(deletePhotoThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deletePhotoThunk.fulfilled,(state, action) => {
            state.loading = false;
            state.recentlyDeleted = state.recentlyDeleted.filter((photo) => photo !== action.payload);
        });
        builder.addCase(deletePhotoThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default photoSlice;
