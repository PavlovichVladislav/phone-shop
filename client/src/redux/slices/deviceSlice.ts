import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IBrand, IDevice, IType } from "../../models/AppModels";

export interface DeviceState {
   types: IType[];
   brands: IBrand[];
   devices: IDevice[];
}

const initialState: DeviceState = {
   types: [
      { id: 1, name: "Холодильники", query: "fridge" },
      { id: 2, name: "Телефоны", query: "phone" },
      { id: 3, name: "Ноутбкуки", query: "laptop" },
      { id: 4, name: "Телевизоры", query: "tv" },
   ],
   brands: [
      { id: 1, name: "Samsung", query: "samsung" },
      { id: 2, name: "Apple", query: "apple" },
      { id: 3, name: "One plus", query: "onePlus" },
      { id: 4, name: "Huawei", query: "huawei" },
   ],
   devices: [
      {
         id: 1,
         name: 'Apple iPhone 14 Plus SIM 256 ГБ "тёмная ночь"',
         price: 99960,
         img: "https://static.re-store.ru/upload/resize_cache/iblock/24f/560_280_140cd750bba9870f18aada2478b24840a/24f5d50a9566b7ce082e806f73aca7a2.jpeg",
         rating: 5,
      },
      {
         id: 1,
         name: 'Apple iPhone 14 Plus SIM 256 ГБ "тёмная ночь"',
         price: 99960,
         img: "https://static.re-store.ru/upload/resize_cache/iblock/24f/560_280_140cd750bba9870f18aada2478b24840a/24f5d50a9566b7ce082e806f73aca7a2.jpeg",
         rating: 5,
      },
      {
         id: 1,
         name: 'Apple iPhone 14 Plus SIM 256 ГБ "тёмная ночь"',
         price: 99960,
         img: "https://static.re-store.ru/upload/resize_cache/iblock/24f/560_280_140cd750bba9870f18aada2478b24840a/24f5d50a9566b7ce082e806f73aca7a2.jpeg",
         rating: 5,
      },
      {
         id: 1,
         name: 'Apple iPhone 14 Plus SIM 256 ГБ "тёмная ночь"',
         price: 99960,
         img: "https://static.re-store.ru/upload/resize_cache/iblock/24f/560_280_140cd750bba9870f18aada2478b24840a/24f5d50a9566b7ce082e806f73aca7a2.jpeg",
         rating: 5,
      },
      {
         id: 1,
         name: 'Apple iPhone 14 Plus SIM 256 ГБ "тёмная ночь"',
         price: 99960,
         img: "https://static.re-store.ru/upload/resize_cache/iblock/24f/560_280_140cd750bba9870f18aada2478b24840a/24f5d50a9566b7ce082e806f73aca7a2.jpeg",
         rating: 5,
      },
   ],
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
