import { $authHost } from ".";
import { IDevice } from "../models/AppModels";

interface IGetBasket {
   count: number;
   devices: IDevice[];
}

export const getBasketDevices = async (userId: number): Promise<IGetBasket> => {
   const { data } = await $authHost.get<IGetBasket>(`api/basket/${userId}`);

   return data;
};
