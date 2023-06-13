import { configureStore } from "@reduxjs/toolkit";

import user from "./slices/userSlice";
import shop from "./slices/shopSlice";
import device from "./slices/deviceSlice";

export const store = configureStore({
   reducer: { user, shop, device },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
