import { createAsyncThunk } from "@reduxjs/toolkit";
import { createComment, fetchComments } from "../../../http/reviewApi";

interface createCommentArgs { 
   comment: string;
   userId: number;
   deviceId: number;
   afterSend: () => void;
}

export const getComments = createAsyncThunk(
   "comments/getComments",
   async (deviceId: number, { rejectWithValue }) => {
      const response = await fetchComments(deviceId);

      if (!response) return rejectWithValue("Не удалось получить комментарии");

      return response;
   }
);

export const sendComment = createAsyncThunk<void, createCommentArgs>(
   "comments/sendComment",
   async ({comment, deviceId, userId, afterSend}, { rejectWithValue, dispatch }) => {
      const response = await createComment(comment, userId, deviceId);

      if (!response) return rejectWithValue("Не удалось отправить комментарий");

      afterSend();
      dispatch(getComments(deviceId));
   }
);