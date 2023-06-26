import { $authHost, $host } from ".";
import { ICategory, IDevice, IFeature } from "../models/AppModels";

export const createType = async (name: string, query: string): Promise<ICategory> => {
   const { data } = await $authHost.post<ICategory>("api/type/", { name, query });

   return {
      id: data.id,
      name: data.name,
      query: data.query,
   };
};

export const fetchTypes = async (): Promise<ICategory[]> => {
   const { data } = await $host.get<ICategory[]>("api/type");

   return data;
};

export const createBrand = async (name: string, query: string): Promise<ICategory> => {
   const { data } = await $authHost.post<ICategory>("api/brand", { name, query });

   return {
      id: data.id,
      name: data.name,
      query: data.query,
   };
};

export const fetchBrands = async (): Promise<ICategory[]> => {
   const { data } = await $host.get<ICategory[]>("api/brand");

   return data;
};

interface createDeviceParams {
   name: string;
   price: string;
   img: string;
   brnadId: string;
   typeId: string;
   features: IFeature[];
}

export const createDevice = async ({
   brnadId,
   features,
   img,
   name,
   price,
   typeId,
}: createDeviceParams): Promise<IDevice> => {
   const formData = new FormData();
   formData.append("name", name);
   formData.append("price", price);
   formData.append("img", img);
   formData.append("brandId", brnadId);
   formData.append("typeId", typeId);
   formData.append("info", JSON.stringify(features));

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

export const fetchOneDevice = async (id: number): Promise<IDevice | null> => {
   try {
      const { data } = await $host.get<IDevice>(`api/device/${id}`);

      return data;
   } catch (error) {
      return null;
   }
};
