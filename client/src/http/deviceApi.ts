import { $authHost, $host } from ".";
import { IBrand, IDevice, IType } from "../models/AppModels";

export const createType = async (name: string, query: string): Promise<IType> => {
   const { data } = await $authHost.post<IType>("api/type/", { name, query });

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

export const createBrand = async (name: string, query: string): Promise<IBrand> => {
   const { data } = await $authHost.post<IType>("api/brand", { name, query });

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

export const createDevice = async (formData: FormData): Promise<IDevice> => {
   const { data } = await $authHost.post<IDevice>("api/device", formData);

   return {
      id: data.id,
      name: data.name,
      price: data.price,
      img: data.img,
      rating: data.rating,
      info: data.info,
   };
};

export interface fetchDevicesRes {
   count: number;
   devices: IDevice[];
}

export const fetchDevices = async (
   brandId: number | null,
   typeId: number | null,
   limit: number | null,
   page: number | null
): Promise<fetchDevicesRes> => {
   const { data } = await $host.get<fetchDevicesRes>("api/device", {
      params: { brandId, typeId, limit, page },
   });

   return data;
};

export const fetchOneDevice = async (id: number): Promise<IDevice> => {
   const { data } = await $host.get<IDevice>(`api/device/${id}`);

   return data;
};