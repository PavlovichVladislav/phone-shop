import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IBrand, IDevice, IType } from "../../models/AppModels";

export interface DeviceState {
   types: IType[];
   brands: IBrand[];
   devices: IDevice[];
   count: number;
   curBrandId: number | null;
   curTypeId: number | null;
}

const initialState: DeviceState = {
   types: [],
   brands: [],
   devices: [],
   count: 0,
   curBrandId: null,
   curTypeId: null
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
      setCount: (state, action: PayloadAction<number>) => {
         state.count = action.payload;
      },
      setBrand: (state, action: PayloadAction<number | null>) => {
         state.curBrandId = action.payload;
      },
      setType: (state, action: PayloadAction<number | null>) => {
         state.curTypeId = action.payload;
      }

   },
});

export const { setBrands, setDeives, setTypes, setCount, setBrand, setType } = deviceSlice.actions;

export default deviceSlice.reducer;
