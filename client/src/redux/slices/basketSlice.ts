import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IBasketDevice } from "../../models/AppModels";

export type BasketState = {
   devices: IBasketDevice[];
};

const initialState: BasketState = {
   devices: [],
};

export const basketSlice = createSlice({
   name: "basket",
   initialState,
   reducers: {
      setBasketDevices: (state, action: PayloadAction<IBasketDevice[]>) => {
         state.devices = action.payload;
      },
      removeBasketDevice: (state, action: PayloadAction<number>) => {
         state.devices = state.devices.filter((device) => device.basketDeviceId !== action.payload);
      },
   },
});

export const { setBasketDevices, removeBasketDevice } = basketSlice.actions;

export default basketSlice.reducer;
