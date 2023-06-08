import { $authHost } from ".";
import { IComment, IRate } from "../models/AppModels";

export const createReview = async (
   rate: number,
   userId: number,
   deviceId: number
): Promise<IRate> => {
   const { data } = await $authHost.post<IRate>("api/review/rate", { rate, userId, deviceId });

   return {
      id: data.id,
      rate: data.rate,
      deviceId: data.deviceId,
      userId: data.userId,
   };
};

export const createComment = async (
   comment: string,
   userId: number,
   deviceId: number
): Promise<IComment> => {
   const { data } = await $authHost.post<IComment>("api/review/comment", {
      comment,
      userId,
      deviceId,
   });

   return {
      id: data.id,
      comment: data.comment,
      deviceId: data.deviceId,
      userId: data.userId,
   };
};

export const fetchComments = async (deviceId: number): Promise<IComment[]> => {
   const { data } = await $authHost.get<{ comments: IComment[]; count: number }>(
      `api/review/comment/${deviceId}`
   );

   return data.comments;
};
