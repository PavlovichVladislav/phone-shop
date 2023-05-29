import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/AppModels";

export interface UserState {
   _isAuth: boolean;
   user: IUser;
}

const initialState: UserState = {
   _isAuth: false,
   user: {
      id: 0,
      email: "",
      role: "",
   },
};

export const userSlice = createSlice({
   name: "userSlice",
   initialState,
   reducers: {
      setIsAuth: (state, action: PayloadAction<boolean>) => {
         state._isAuth = action.payload;
      },
      setUser: (state, action: PayloadAction<IUser>) => {
         state.user = action.payload
      },
   },
});

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
