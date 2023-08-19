import { configureStore } from "@reduxjs/toolkit";
import { recordApiSlice } from "./slice/record";
import extraReducer from "./reducer/extra";
export const store = configureStore({
  reducer: {
    extra: extraReducer,
    [recordApiSlice.reducerPath]: recordApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([recordApiSlice.middleware]),
});
