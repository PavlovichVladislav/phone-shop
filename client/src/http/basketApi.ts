import { $authHost } from ".";
import { IBasketDevice } from "../models/AppModels";

interface IGetBasketRes {
   count: number;
   devices: IBasketDevice[];
}

interface IAddBaksetRes {
   id: number;
   basketId: number;
   deviceId: number;
}

export const getBasketDevices = async (userId: number): Promise<IGetBasketRes> => {
   const { data } = await $authHost.get<IGetBasketRes>(`api/basket/${userId}`);

   return data;
};

export const addBasketDevice = async (userId: number, deviceId: number): Promise<IAddBaksetRes> => {
   const { data } = await $authHost.post<IAddBaksetRes>(`api/basket/`, { userId, deviceId });

   const { basketId, id } = data;

   return {
      basketId,
      deviceId,
      id,
   };
};

export const deleteBasketDevice = async (baskedDeviceId: number) => {
   const { data } = await $authHost.delete<IAddBaksetRes>(`api/basket/${baskedDeviceId}`);
};
