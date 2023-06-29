import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBrands, fetchDevices, fetchTypes } from "../../../http/deviceApi";
import { fetchDevicesArgs, fetchDevicesRes } from "../../../models/AppModels";

export const getDevices = createAsyncThunk<fetchDevicesRes, fetchDevicesArgs>(
   "shop/getDevices",
   async (args, { rejectWithValue }) => {
      try {
         const response = await fetchDevices({ ...args });

         return response;
      } catch (error) {
         const err = error as Error;

         return rejectWithValue(err.message);
      }
   }
);

export const getTypes = createAsyncThunk("shop/getTypes", async (_, { rejectWithValue }) => {
   try {
      const response = await fetchTypes();

      return response;
   } catch (error) {
      const err = error as Error;

      return rejectWithValue(err.message);
   }
});

export const getBrands = createAsyncThunk("shop/getBrands", async (_, { rejectWithValue }) => {
   try {
      const response = await fetchBrands();

      return response;
   } catch (error) {
      const err = error as Error;

      return rejectWithValue(err.message);
   }
});
