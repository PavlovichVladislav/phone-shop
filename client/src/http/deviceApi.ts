import { $authHost, $host } from ".";
import {
   ICategory,
   IDevice,
   IFeature,
   fetchDevicesArgs,
   fetchDevicesRes,
} from "../models/AppModels";

export const createType = async (name: string, query: string): Promise<ICategory> => {
   try {
      const { data } = await $authHost.post<ICategory>("api/type/", { name, query });

      return {
         id: data.id,
         name: data.name,
         query: data.query,
      };
   } catch (error) {
      throw new Error("Не удалось создать устройство");
   }
};

export const fetchTypes = async (): Promise<ICategory[]> => {
   try {
      const { data } = await $host.get<ICategory[]>("api/type");

      return data;
   } catch (error) {
      throw new Error("Не удалось получить типы устройств");
   }
};

export const createBrand = async (name: string, query: string): Promise<ICategory> => {
   try {
      const { data } = await $authHost.post<ICategory>("api/brand", { name, query });

      return {
         id: data.id,
         name: data.name,
         query: data.query,
      };
   } catch (error) {
      throw new Error("Не удалось создать бренд");
   }
};

export const fetchBrands = async (): Promise<ICategory[]> => {
   try {
      const { data } = await $host.get<ICategory[]>("api/brand");

      return data;
   } catch (error) {
      throw new Error("Не удалось получить бренды");
   }
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
   try {
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
   } catch (error) {
      throw new Error("Не удалось создать устройство");
   }
};

export const fetchDevices = async ({
   brandId,
   limit,
   page,
   typeId,
}: fetchDevicesArgs): Promise<fetchDevicesRes> => {
   try {
      const { data } = await $host.get<fetchDevicesRes>("api/device", {
         params: { brandId, typeId, limit, page },
      });

      return data;
   } catch (error) {
      throw new Error("Не удалось получить устройства");
   }
};

export const fetchOneDevice = async (id: number): Promise<IDevice> => {
   try {
      const { data } = await $host.get<IDevice>(`api/device/${id}`);

      return data;
   } catch (error) {
      throw new Error("Не удалось получить устройство");
   }
};
