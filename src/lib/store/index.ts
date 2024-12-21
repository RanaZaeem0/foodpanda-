
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import api from "../api/api";

 const store = configureStore({
    reducer:{
        auth:authSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export default store
