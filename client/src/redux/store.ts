import { configureStore } from "@reduxjs/toolkit";

import user from "./slices/user/userSlice";
import shop from "./slices/shopSlice";
import device from "./slices/device/deviceSlice";
import basket from "./slices/basketSlice";
import comments from "./slices/comments/commentSlice";

export const store = configureStore({
   reducer: { user, shop, device, basket, comments },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
