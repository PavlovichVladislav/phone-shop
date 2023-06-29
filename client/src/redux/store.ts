import { configureStore } from "@reduxjs/toolkit";

import user from "./slices/user/userSlice";
import shop from "./slices/shop/shopSlice";
import device from "./slices/device/deviceSlice";
import basket from "./slices/basket/basketSlice";
import comments from "./slices/comments/commentSlice";
import modals from "./slices/modals/modalsSlice";

export const store = configureStore({
   reducer: { user, shop, device, basket, comments, modals },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
