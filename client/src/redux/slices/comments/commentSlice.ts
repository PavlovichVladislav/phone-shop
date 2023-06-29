import { createSlice } from "@reduxjs/toolkit";

import { IComment } from "../../../models/AppModels";
import { getComments, sendComment } from "./commentThunks";

export type DeviceState = {
   comments: IComment[];
   isCommentsLoading: boolean;
   isSendingComment: boolean;
   commentsError: string;
   sendCommentError: string;
};

const initialState: DeviceState = {
   comments: [],
   isCommentsLoading: false,
   isSendingComment: false,
   commentsError: "",
   sendCommentError: "",
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
         })
         .addCase(sendComment.pending, (state) => {
            state.isSendingComment = true;
         })
         .addCase(sendComment.fulfilled, (state) => {
            state.isSendingComment = false;
            state.sendCommentError = "";
         })
         .addCase(sendComment.rejected, (state, { payload: errorMsg }) => {
            state.sendCommentError = errorMsg as string;
            state.isSendingComment = false;
         });
   },
});

export default deviceSlice.reducer;
