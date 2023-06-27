import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDevice, IGetBasketRes } from "../../../models/AppModels";
import {
   decBasketDevice,
   delBasketDevice,
   getBasketDevices,
   incBasketDevice,
   postBasketDevice,
} from "../../../http/basketApi";
import {
   addBasketDevice,
   decrBasketDevice,
   deleteBasketDevice,
   incrBasketDevice,
} from "./basketSlice";

export const fetchBasketDevices = createAsyncThunk<IGetBasketRes, number>(
   "basket/fetchDevices",
   async (userId, { rejectWithValue }) => {
      const response = await getBasketDevices(userId);

      if (!response) return rejectWithValue("Не удалось поолучить устройства корзины");

      return response;
   }
);

interface changeBasketArgs {
   basketDeviceId: number;
}

interface addBasketArgs {
   userId: number;
   deviceId: number;
   device: IDevice;
}

export const addBasketDeviceThunk = createAsyncThunk<void, addBasketArgs>(
   "basket/addBasketDevice",
   async ({ deviceId, userId, device }, { rejectWithValue, dispatch }) => {
      const response = await postBasketDevice(userId, deviceId);

      if (!response) return rejectWithValue("Не удалось добавить устройство в корзину");

      dispatch(addBasketDevice({ basketDeviceId: response.id, ...device }));
   }
);

export const removeBasketDevice = createAsyncThunk<void, changeBasketArgs>(
   "basket/deleteBasketDevice",
   async ({ basketDeviceId }, { rejectWithValue, dispatch }) => {
      const response = await delBasketDevice(basketDeviceId);

      if (response) return rejectWithValue(response);

      dispatch(deleteBasketDevice(basketDeviceId));
   }
);

export const incBasketDeviceThunk = createAsyncThunk<void, changeBasketArgs>(
   "basket/incrBasketDevice",
   async ({ basketDeviceId }, { rejectWithValue, dispatch }) => {
      const response = await incBasketDevice(basketDeviceId);

      if (response) return rejectWithValue(response);
      dispatch(incrBasketDevice(basketDeviceId));
   }
);

export const decBasketDeviceThunk = createAsyncThunk<void, changeBasketArgs>(
   "basket/decrBasketDevice",
   async ({ basketDeviceId }, { rejectWithValue, dispatch }) => {
      const response = await decBasketDevice(basketDeviceId);

      if (response) return rejectWithValue(response);
      dispatch(decrBasketDevice(basketDeviceId));
   }
);
