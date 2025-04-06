import photoReducer from '../features/photos/photoSlice';
import { configureStore } from '@reduxjs/toolkit';



const store = configureStore({
    reducer: {
        photos: photoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;