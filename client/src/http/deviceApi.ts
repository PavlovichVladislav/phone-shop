import { $authHost, $host } from ".";
import { IBrand, IDevice, IType } from "../models/AppModels";

export const createType = async (name: string): Promise<IType> => {
   const { data } = await $authHost.post<IType>("api/type/", { name });

   return {
      id: data.id,
      name: data.name,
      query: data.query,
   };
};

export const fetchTypes = async (): Promise<IType[]> => {
   const { data } = await $host.get<IType[]>("api/type");

   return data;
};

export const createBrand = async (name: string): Promise<IBrand> => {
   const { data } = await $authHost.post<IType>("api/brand", { name });

   return {
      id: data.id,
      name: data.name,
      query: data.query,
   };
};

export const fetchBrands = async (): Promise<IBrand[]> => {
   const { data } = await $host.get<IBrand[]>("api/brand");

   return data;
};

export const createDevice = async ({ img, name, price }: IDevice): Promise<IDevice> => {
   const { data } = await $authHost.post<IDevice>("api/brand", { img, name, price });

   return {
      id: data.id,
      name: data.name,
      price: data.price,
      img: data.img,
      rating: data.rating,
   };
};

export interface fetchDevicesRes {
    count: number;
    devices: IDevice[],
}

export const fetchDevices = async (): Promise<fetchDevicesRes> => {
   const { data } = await $host.get<fetchDevicesRes>("api/device");

   return data;
};

export const fetchOneDevice = async (id: number): Promise<IDevice> => {
   const { data } = await $host.get<IDevice>(`api/device/${id}`);

   return data;
};
