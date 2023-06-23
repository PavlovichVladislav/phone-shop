import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../../models/AppModels";
import { checkUsersAuth, logUser, regUser } from "./userThunks";

export interface UserState {
   _isAuth: boolean;
   user: TUser;
   isLoading: boolean;
   error: string;
}

const initialState: UserState = {
   _isAuth: false,
   user: null,
   isLoading: false,
   error: "",
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setIsAuth: (state, action: PayloadAction<boolean>) => {
         state._isAuth = action.payload;
      },
      setUser: (state, action: PayloadAction<TUser>) => {
         state.user = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(regUser.pending, (state, _) => {
            state.isLoading = true;
         })
         .addCase(regUser.fulfilled, (state, { payload: user }) => {
            state.isLoading = false;
            state.error = "";
            state.user = user;
            state._isAuth = true;
         })
         .addCase(regUser.rejected, (state, { payload: error }) => {
            state.isLoading = false;
            state.error = error as string;
            state.user = null;
            state._isAuth = false;
         })
         .addCase(logUser.pending, (state, _) => {
            state.isLoading = true;
         })
         .addCase(logUser.fulfilled, (state, { payload: user }) => {
            state.isLoading = false;
            state.error = "";
            state.user = user;
            state._isAuth = true;
         })
         .addCase(logUser.rejected, (state, { payload: error }) => {
            state.isLoading = false;
            state.error = error as string;
            state.user = null;
            state._isAuth = false;
         })
         .addCase(checkUsersAuth.pending, (state, _) => {
            state.isLoading = true;
         })
         .addCase(checkUsersAuth.fulfilled, (state, { payload: user }) => {
            state.isLoading = false;
            state.error = "";
            state.user = user;
            state._isAuth = true;
         })
         .addCase(checkUsersAuth.rejected, (state, { payload: error }) => {
            state.isLoading = false;
            state.error = error as string;
            state.user = null;
            state._isAuth = false;
         });
   },
});

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
