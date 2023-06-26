import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IDevice } from "../../../models/AppModels";
import { getOneDevice } from "./deviceThunks";

export type DeviceState = {
   device: IDevice;
   isDeviceLoading: boolean;
   deviceError: string;
};

const initialState: DeviceState = {
   device: {
      id: 0,
      img: "",
      info: [],
      name: "",
      price: 0,
      rating: 0,
   },
   isDeviceLoading: false,
   deviceError: "",
};

export const deviceSlice = createSlice({
   name: "device",
   initialState,
   reducers: {
      setDevice: (state, action: PayloadAction<IDevice>) => {
         state.device = action.payload;
      },
      setRate: (state, action: PayloadAction<number>) => {
         state.device.rating = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getOneDevice.pending, (state) => {
            state.isDeviceLoading = true;
         })
         .addCase(getOneDevice.fulfilled, (state, { payload: device }) => {
            state.device = device;
            state.isDeviceLoading = false;
            state.deviceError = "";
         })
         .addCase(getOneDevice.rejected, (state, { payload: errorMsg }) => {
            state.deviceError = errorMsg as string;
            state.isDeviceLoading = false;
            state.device = {
               id: 0,
               img: "",
               info: [],
               name: "",
               price: 0,
               rating: 0,
            };
         });
   },
});

export const { setRate } = deviceSlice.actions;

export default deviceSlice.reducer;
