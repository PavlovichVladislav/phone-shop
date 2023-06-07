import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../models/AppModels";

export interface UserState {
   _isAuth: boolean;
   user: TUser;
}

const initialState: UserState = {
   _isAuth: false,
   user: null,
};

export const userSlice = createSlice({
   name: "userSlice",
   initialState,
   reducers: {
      setIsAuth: (state, action: PayloadAction<boolean>) => {
         state._isAuth = action.payload;
      },
      setUser: (state, action: PayloadAction<TUser>) => {
         state.user = action.payload;
      },
   },
});

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
