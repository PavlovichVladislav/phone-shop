import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments } from "../../../http/reviewApi";

export const getComments = createAsyncThunk(
   "comments/getComments",
   async (deviceId: number, { rejectWithValue }) => {
      const response = await fetchComments(deviceId);

      if (!response) return rejectWithValue("Не удалось получить комментарии");

      return response;
   }
);