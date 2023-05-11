import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import device from "./slices/deviceSlice";

export const store = configureStore({
   reducer: { user, device },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
