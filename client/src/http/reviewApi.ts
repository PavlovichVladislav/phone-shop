import { $authHost } from ".";
import { CreateReviewRes, IComment } from "../models/AppModels";

export const createReview = async (
   rate: number,
   userId: number,
   deviceId: number
): Promise<CreateReviewRes | null> => {
   try {
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
   } catch (error) {
      return null;
   }
};

export const createComment = async (
   comment: string,
   userId: number,
   deviceId: number
): Promise<IComment | null> => {
   try {
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
   } catch (error) {
      return null;
   }
};

export const fetchComments = async (deviceId: number): Promise<IComment[] | null> => {
   try {
      const { data } = await $authHost.get<{ comments: IComment[]; count: number }>(
         `api/review/comment/${deviceId}`
      );

      return data.comments;
   } catch (error) {
      return null;
   }
};
