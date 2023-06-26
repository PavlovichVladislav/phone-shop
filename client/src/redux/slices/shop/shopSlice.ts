import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { ICategory, IDevice } from "../../../models/AppModels";
import { getBrands, getDevices, getTypes } from "./shopThunks";

export interface ShopState {
   types: ICategory[];
   brands: ICategory[];
   devices: IDevice[];
   count: number;
   curBrandId: number | null;
   curTypeId: number | null;
   isDevicesLoading: boolean;
   isTypesLoading: boolean;
   isBrandsLoading: boolean;
   deviceError: string;
   typesError: string;
   brandsError: string;
}

const initialState: ShopState = {
   types: [],
   brands: [],
   devices: [],
   count: 0,
   curBrandId: null,
   curTypeId: null,
   isDevicesLoading: true,
   isTypesLoading: true,
   isBrandsLoading: true,
   deviceError: "",
   typesError: "",
   brandsError: ""
};

export const shopSlice = createSlice({
   name: "shop",
   initialState,
   reducers: {
      setCurBrand: (state, action: PayloadAction<number | null>) => {
         state.curBrandId = action.payload;
      },
      setCurType: (state, action: PayloadAction<number | null>) => {
         state.curTypeId = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getDevices.pending, (state) => {
            state.isDevicesLoading = true;
         })
         .addCase(getDevices.fulfilled, (state, { payload }) => {
            const { count, devices } = payload;

            state.isDevicesLoading = false;
            state.devices = devices;
            state.count = count;
            state.deviceError = "";
         })
         .addCase(getDevices.rejected, (state, { payload: deviceErrorMsg }) => {
            state.isDevicesLoading = false;
            state.devices = [];
            state.count = 0;
            state.deviceError = deviceErrorMsg as string;
         })
         .addCase(getTypes.pending, (state) => {
            state.isTypesLoading = true;
         })
         .addCase(getTypes.fulfilled, (state, { payload: types }) => {
            state.isTypesLoading = false;
            state.types = types;
            state.typesError = "";
         })
         .addCase(getTypes.rejected, (state, { payload: typesErrorMsg }) => {
            state.isTypesLoading = false;
            state.types = [];
            state.typesError = typesErrorMsg as string;
         })
         .addCase(getBrands.pending, (state) => {
            state.isBrandsLoading = true;
         })
         .addCase(getBrands.fulfilled, (state, { payload: brands }) => {
            state.isBrandsLoading = false;
            state.brands = brands;
            state.typesError = "";
         })
         .addCase(getBrands.rejected, (state, { payload: brandsErrorMsg }) => {
            state.isBrandsLoading = false;
            state.brands = [];
            state.typesError = brandsErrorMsg as string;
         });
   },
});

export const { setCurBrand, setCurType } = shopSlice.actions;

export default shopSlice.reducer;
