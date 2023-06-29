import { createAsyncThunk } from "@reduxjs/toolkit";
import { createComment, fetchComments } from "../../../http/reviewApi";
import { setNoteCommentsVisible } from "../modals/modalsSlice";

interface createCommentArgs {
   comment: string;
   userId: number;
   deviceId: number;
   afterSend: () => void;
}

export const getComments = createAsyncThunk(
   "comments/getComments",
   async (deviceId: number, { rejectWithValue }) => {
      try {
         const response = await fetchComments(deviceId);

         return response;
      } catch (error) {
         const err = error as Error;

         return rejectWithValue(err.message);
      }
   }
);

export const sendComment = createAsyncThunk<void, createCommentArgs>(
   "comments/sendComment",
   ({ comment, deviceId, userId, afterSend }, { rejectWithValue, dispatch }) => {
      // try {
      //    await createComment(comment, userId, deviceId);

      //    afterSend();
      //    dispatch(getComments(deviceId));
      //    dispatch(setNoteCommentsVisible(true));
      // } catch (error) {
      //    const err = error as Error;

      //    dispatch(setNoteCommentsVisible(true));
      //    return rejectWithValue(err.message);
      // }

      return createComment(comment, userId, deviceId)
         .then(() => {
            dispatch(getComments(deviceId));
         })
         .catch((err: Error) => {
            console.log(err.message);
            return rejectWithValue(err.message);
         })
         .finally(() => {
            afterSend();
            dispatch(setNoteCommentsVisible(true));
         });
   }
);
