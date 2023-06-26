import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOneDevice } from "../../../http/deviceApi";

export const getOneDevice = createAsyncThunk(
   "device/getOne",
   async (id: number, { rejectWithValue }) => {
      const response = await fetchOneDevice(id);

      if (!response) return rejectWithValue("Не удалось получить устройство");

      return response;
   }
);
