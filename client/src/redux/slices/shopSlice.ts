import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { ICategory, IDevice } from "../../models/AppModels";

export interface ShopState {
   types: ICategory[];
   brands: ICategory[];
   devices: IDevice[];
   count: number;
   curBrandId: number | null;
   curTypeId: number | null;
}

const initialState: ShopState = {
   types: [],
   brands: [],
   devices: [],
   count: 0,
   curBrandId: null,
   curTypeId: null,
};

export const shopSlice = createSlice({
   name: "shop",
   initialState,
   reducers: {
      setTypes: (state, action: PayloadAction<ICategory[]>) => {
         state.types = action.payload;
      },
      setBrands: (state, action: PayloadAction<ICategory[]>) => {
         state.brands = action.payload;
      },
      setDeives: (state, action: PayloadAction<IDevice[]>) => {
         state.devices = action.payload;
      },
      setCount: (state, action: PayloadAction<number>) => {
         state.count = action.payload;
      },
      setCurBrand: (state, action: PayloadAction<number | null>) => {
         state.curBrandId = action.payload;
      },
      setCurType: (state, action: PayloadAction<number | null>) => {
         state.curTypeId = action.payload;
      },
   },
});

export const { setBrands, setDeives, setTypes, setCount, setCurBrand, setCurType } = shopSlice.actions;

export default shopSlice.reducer;
