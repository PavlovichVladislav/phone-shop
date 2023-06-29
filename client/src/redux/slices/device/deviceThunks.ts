import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOneDevice } from "../../../http/deviceApi";
import { createReview } from "../../../http/reviewApi";

interface makeReviewArgs {
   rate: number;
   userId: number;
   deviceId: number;
   afterSend: () => void;
}

export const getOneDevice = createAsyncThunk(
   "device/getOne",
   async (id: number, { rejectWithValue }) => {
      try {
         const response = await fetchOneDevice(id);

         return response;
      } catch (error) {
         const err = error as Error;

         return rejectWithValue(err.message);
      }
   }
);

export const makeReview = createAsyncThunk<number, makeReviewArgs>(
   "device/makeReview",
   async ({ deviceId, rate, userId, afterSend }, { rejectWithValue }) => {
      try {
         const response = await createReview(rate, userId, deviceId);
         afterSend();

         return response.deviceRate;
      } catch (error) {
         const err = error as Error;

         return rejectWithValue(err.message);
      }
   }
);
