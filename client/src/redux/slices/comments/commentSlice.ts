import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../../models/AppModels";
import { getComments } from "./commentThunks";

export type DeviceState = {
   comments: IComment[];
   isCommentsLoading: boolean;
   commentsError: string;
};

const initialState: DeviceState = {
   comments: [],
   isCommentsLoading: false,
   commentsError: "",
};

export const deviceSlice = createSlice({
   name: "comments",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getComments.pending, (state) => {
            state.isCommentsLoading = true;
         })
         .addCase(getComments.fulfilled, (state, { payload: comments }) => {
            state.isCommentsLoading = false;
            state.comments = comments;
            state.commentsError = "";
         })
         .addCase(getComments.rejected, (state, { payload: errorMsg }) => {
            state.isCommentsLoading = false;
            state.comments = [];
            state.commentsError = errorMsg as string;
         });
   },
});

export default deviceSlice.reducer;
