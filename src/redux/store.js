import { configureStore } from "@reduxjs/toolkit";
import { recordApiSlice } from "./slice/record";

export const store = configureStore({
  reducer: {
    [recordApiSlice.reducerPath]: recordApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([recordApiSlice.middleware]),
});
