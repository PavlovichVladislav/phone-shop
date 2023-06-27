import { $authHost } from ".";
import { IBasketDevice, IGetBasketRes } from "../models/AppModels";

interface IAddBaksetRes {
   id: number;
   basketId: number;
   deviceId: number;
}

export const getBasketDevices = async (userId: number): Promise<IGetBasketRes | null> => {
   try {
      const { data } = await $authHost.get<IGetBasketRes>(`api/basket/${userId}`);

      return data;
   } catch (error) {
      return null;
   }
};

export const postBasketDevice = async (
   userId: number,
   deviceId: number
): Promise<IAddBaksetRes | null> => {
   try {
      const { data } = await $authHost.post<IAddBaksetRes>(`api/basket/`, { userId, deviceId });

      const { basketId, id } = data;

      return {
         basketId,
         deviceId,
         id,
      };
   } catch (error) {
      return null;
   }
};

export const delBasketDevice = async (baskedDeviceId: number) => {
   try {
      const { data } = await $authHost.delete<IAddBaksetRes>(`api/basket/${baskedDeviceId}`);
   } catch (error) {
      return "Не удалось удалить устройство";
   }
};

export const incBasketDevice = async (baskedDeviceId: number) => {
   try {
      const { data } = await $authHost.post<IBasketDevice>(`api/basket/inc/${baskedDeviceId}`);
   } catch (error) {
      return "Не удалось увеличить кол-во устройства в корзине";
   }
};

export const decBasketDevice = async (baskedDeviceId: number) => {
   try {
      const { data } = await $authHost.post<IBasketDevice | {}>(`api/basket/dec/${baskedDeviceId}`);
   } catch (error) {
      return "Не удалось уменьшить кол-во устройства в корзине";
   }
};
