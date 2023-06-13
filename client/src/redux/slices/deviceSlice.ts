import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IComment, IDevice } from "../../models/AppModels";

export type DeviceState = {
   device: IDevice;
   comments: IComment[];
}

const initialState: DeviceState = {
   device: {
      id: 0,
      img: "",
      info: [],
      name: "",
      price: 0,
      rating: 0,
   },
   comments: [],
};

export const deviceSlice = createSlice({
   name: "device",
   initialState,
   reducers: {
      setDevice: (state, action: PayloadAction<IDevice>) => {
         state.device = action.payload;
      },
      setComments: (state, action: PayloadAction<IComment[]>) => {
         state.comments = action.payload;
      },
      setRate: (state, action: PayloadAction<number>) => {
         state.device.rating = action.payload;
      },
   },
});

export const { setDevice, setComments, setRate } = deviceSlice.actions;

export default deviceSlice.reducer;
