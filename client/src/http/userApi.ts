import jwtDecode from "jwt-decode";
import { $authHost, $host } from ".";
import { IUser } from "../models/AppModels";

interface authResponse {
   token: string;
}

export const registration = async (email: string, password: string) => {
   const { data } = await $host.post<authResponse>("api/user/registration", {
      email,
      password,
      role: "ADMIN",
   });
   localStorage.setItem("token", data.token);

   return jwtDecode<IUser>(data.token);
};

export const login = async (email: string, password: string) => {
   const { data } = await $host.post<authResponse>("api/user/login", { email, password });
   localStorage.setItem("token", data.token);

   return jwtDecode<IUser>(data.token);
};

export const check = async () => {
   const response = await $host.get("api/user/auth");

   return response;
};
