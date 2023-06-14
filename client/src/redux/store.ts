import { configureStore } from "@reduxjs/toolkit";

import user from "./slices/userSlice";
import shop from "./slices/shopSlice";
import device from "./slices/deviceSlice";
import basket from "./slices/basketSlice";

export const store = configureStore({
   reducer: { user, shop, device, basket },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
