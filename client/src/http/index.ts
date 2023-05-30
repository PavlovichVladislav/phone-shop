import axios, { InternalAxiosRequestConfig } from "axios";

const $host = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

   return config;
};

$host.interceptors.request.use(authInterceptor);

export { $host, $authHost };
