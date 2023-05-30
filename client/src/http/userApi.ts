import jwtDecode from "jwt-decode";
import { $authHost, $host } from ".";
import { IUser } from "../models/AppModels";

interface authResponse {
   token: string;
}

export const registration = async (regEmail: string, password: string): Promise<IUser> => {
   const { data } = await $host.post<authResponse>("api/user/registration", {
      email: regEmail,
      password,
      role: "ADMIN",
   });
   localStorage.setItem("token", data.token);
   const { id, email, role } = jwtDecode<IUser>(data.token);

   return { id, email, role };
};

export const login = async (logEmail: string, password: string): Promise<IUser> => {
   const { data } = await $host.post<authResponse>("api/user/login", { email: logEmail, password });
   localStorage.setItem("token", data.token);
   const { id, email, role } = jwtDecode<IUser>(data.token);

   return { id, email, role };
};

export const check = async (): Promise<IUser> => {
   const { data } = await $host.get<authResponse>("api/user/auth");
   const { id, email, role } = jwtDecode<IUser>(data.token);

   return { id, email, role };
};
