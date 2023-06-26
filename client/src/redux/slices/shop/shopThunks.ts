import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBrands, fetchDevices, fetchTypes } from "../../../http/deviceApi";
import { fetchDevicesArgs, fetchDevicesRes } from "../../../models/AppModels";

export const getDevices = createAsyncThunk<fetchDevicesRes, fetchDevicesArgs>(
   "shop/getDevices",
   async (args, { rejectWithValue }) => {
      const response = await fetchDevices({...args});

      if (!response) return rejectWithValue('Не удалось получить устройства');

      return response;
   }
);

export const getTypes = createAsyncThunk("shop/getTypes", async (_, { rejectWithValue }) => {
    const response = await fetchTypes();

    if (!response) return rejectWithValue('Не удалось получить типы устройств');

    return response;
})

export const getBrands = createAsyncThunk("shop/getBrands", async (_, { rejectWithValue }) => {
    const response = await fetchBrands();

    if (!response) return rejectWithValue('Не удалось получить бренды устройств');

    return response;
})

