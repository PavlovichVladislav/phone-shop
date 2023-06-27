import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IBasketDevice } from "../../../models/AppModels";
import {
   decBasketDeviceThunk,
   fetchBasketDevices,
   incBasketDeviceThunk,
   removeBasketDevice,
} from "./basketThunks";

export type BasketState = {
   devices: IBasketDevice[];
   count: number;
   isDevicesLoading: boolean;
   error: string;
};

const initialState: BasketState = {
   devices: [],
   count: 0,
   isDevicesLoading: true,
   error: "",
};

export const basketSlice = createSlice({
   name: "basket",
   initialState,
   reducers: {
      setBasketDevices: (state, action: PayloadAction<IBasketDevice[]>) => {
         state.devices = action.payload;
      },
      deleteBasketDevice: (state, action: PayloadAction<number>) => {
         state.devices = state.devices.filter((device) => device.basketDeviceId !== action.payload);
      },
      incrBasketDevice: (state, action: PayloadAction<number>) => {
         state.devices = state.devices.map((device) =>
            device.basketDeviceId === action.payload
               ? { ...device, count: device.count + 1 }
               : device
         );
      },
      decrBasketDevice: (state, action: PayloadAction<number>) => {
         state.devices = state.devices.map((device) =>
            device.basketDeviceId === action.payload
               ? { ...device, count: device.count - 1 }
               : device
         );
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchBasketDevices.pending, (state) => {
            state.isDevicesLoading = true;
         })
         .addCase(fetchBasketDevices.fulfilled, (state, { payload }) => {
            state.isDevicesLoading = false;
            state.devices = payload.devices;
            state.count = payload.count;
            state.error = "";
         })
         .addCase(fetchBasketDevices.rejected, (state, { payload: errorMsg }) => {
            state.isDevicesLoading = false;
            state.devices = [];
            state.count = 0;
            state.error = errorMsg as string;
         })
         .addCase(removeBasketDevice.rejected, (state, { payload: errorMsg }) => {
            state.error = errorMsg as string;
         })
         .addCase(incBasketDeviceThunk.rejected, (state, { payload: errorMsg }) => {
            state.error = errorMsg as string;
         })
         .addCase(decBasketDeviceThunk.rejected, (state, { payload: errorMsg }) => {
            state.error = errorMsg as string;
         });
   },
});

export const { setBasketDevices, deleteBasketDevice, incrBasketDevice, decrBasketDevice } =
   basketSlice.actions;

export default basketSlice.reducer;
