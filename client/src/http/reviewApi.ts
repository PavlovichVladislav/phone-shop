import { $authHost } from ".";
import { IRate } from "../models/AppModels";

export const createReview = async (
   rate: number,
   userId: number,
   deviceId: number
): Promise<IRate> => {
   const { data } = await $authHost.post<IRate>("api/review/", { rate, userId, deviceId });

   return {
      id: data.id,
      rate: data.rate,
      deviceId: data.deviceId,
      userId: data.userId,
   };
};
