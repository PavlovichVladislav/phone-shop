import { $authHost } from ".";
import { IComment, IRate } from "../models/AppModels";

type CreateReviewRes = IRate & { deviceRate: number }

export const createReview = async (
   rate: number,
   userId: number,
   deviceId: number
): Promise<CreateReviewRes> => {
   const { data } = await $authHost.post<CreateReviewRes>("api/review/rate", {
      rate,
      userId,
      deviceId,
   });

   return {
      id: data.id,
      rate: data.rate,
      deviceId: data.deviceId,
      userId: data.userId,
      deviceRate: data.deviceRate,
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
