export interface IUser {
   id: number;
   email: string;
   role: string;
}

export type TUser = IUser | null;

export interface ICategory {
   id: number;
   name: string;
   query: string;
}

export interface IFeature {
   id: string;
   title: string;
   description: string;
}

export interface IDevice {
   id: number;
   name: string;
   price: number;
   rating: number;
   img: string;
   info: IFeature[];
}

export type IBasketDevice = IDevice & { basketDeviceId: number; count: number };

export interface IRate {
   id: number;
   rate: number;
   userId: number;
   deviceId: number;
}

export interface IComment {
   id: number;
   comment: string;
   userId: number;
   deviceId: number;
}

export type CreateReviewRes = IRate & { deviceRate: number };

export interface fetchDevicesArgs {
   brandId: number | null;
   typeId: number | null;
   limit: number | null;
   page: number | null;
}

export interface fetchDevicesRes {
   count: number;
   devices: IDevice[];
}