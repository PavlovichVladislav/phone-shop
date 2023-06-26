import { createSlice } from "@reduxjs/toolkit";

import { IDevice } from "../../../models/AppModels";
import { getOneDevice, makeReview } from "./deviceThunks";

export type DeviceState = {
   device: IDevice;
   isDeviceLoading: boolean;
   deviceError: string;
   rateError: string;
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
   rateError: ""
};

export const deviceSlice = createSlice({
   name: "device",
   initialState,
   reducers: {},
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
         }).addCase(makeReview.fulfilled, (state, { payload: rate }) => {
            state.device.rating = rate;
         }).addCase(makeReview.rejected, (state, { payload: errorMsg }) => {
            state.rateError = errorMsg as string;
         })
   },
});

export default deviceSlice.reducer;
