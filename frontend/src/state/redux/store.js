import photoSlice from "./photoSlice.js";
import { configureStore } from "@reduxjs/toolkit";



const store = configureStore({
    reducer: {
        photos: photoSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;