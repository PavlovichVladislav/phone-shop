import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IBrand, IDevice, IType } from "../../models/AppModels";

export interface DeviceState {
   types: IType[];
   brands: IBrand[];
   devices: IDevice[];
}

const initialState: DeviceState = {
   types: [],
   brands: [],
   devices: [],
};

export const deviceSlice = createSlice({
   name: "device",
   initialState,
   reducers: {
      setTypes: (state, action: PayloadAction<IType[]>) => {
         state.types = action.payload;
      },
      setBrands: (state, action: PayloadAction<IBrand[]>) => {
         state.brands = action.payload;
      },
      setDeives: (state, action: PayloadAction<IDevice[]>) => {
         state.devices = action.payload;
      },
   },
});

export const { setBrands, setDeives, setTypes } = deviceSlice.actions;

export default deviceSlice.reducer;
