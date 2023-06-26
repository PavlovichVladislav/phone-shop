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
      const response = await fetchOneDevice(id);

      if (!response) return rejectWithValue("Не удалось получить устройство");

      return response;
   }
);

export const makeReview = createAsyncThunk<number, makeReviewArgs>(
   "device/makeReview",
   async ({ deviceId, rate, userId, afterSend }, { rejectWithValue }) => {
      const response = await createReview(rate, userId, deviceId);

      if (!response) return rejectWithValue("Не удалось отправить оценку устройства");

      afterSend();
      return response.deviceRate;
   }
);
