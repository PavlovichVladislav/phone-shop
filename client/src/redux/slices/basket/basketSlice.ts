import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IBasketDevice, IDevice } from "../../../models/AppModels";
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
      addBasketDevice: (
         state,
         { payload }: PayloadAction<IDevice & { basketDeviceId: number }>
      ) => {
         const index = state.devices.findIndex(
            (device) => device.basketDeviceId === payload.basketDeviceId
         );

         if (index !== -1) {
            state.devices[index].count++;
            state.count++;
         } else {
            state.devices.push({ ...payload, count: 1 });
            state.count++;
         }
      },
      deleteBasketDevice: (state, action: PayloadAction<number>) => {
         state.devices = state.devices.filter((device) => device.basketDeviceId !== action.payload);
         state.count = state.devices.reduce((totalCount, { count }) => totalCount + count, 0);
      },
      incrBasketDevice: (state, action: PayloadAction<number>) => {
         state.devices = state.devices.map((device) =>
            device.basketDeviceId === action.payload
               ? { ...device, count: device.count + 1 }
               : device
         );
         state.count++;
      },
      decrBasketDevice: (state, action: PayloadAction<number>) => {
         state.devices = state.devices.map((device) =>
            device.basketDeviceId === action.payload
               ? { ...device, count: device.count - 1 }
               : device
         );
         state.count--;
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
            state.count = payload.devices.reduce((totalCount, { count }) => totalCount + count, 0);
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

export const { deleteBasketDevice, incrBasketDevice, decrBasketDevice, addBasketDevice } =
   basketSlice.actions;

export default basketSlice.reducer;