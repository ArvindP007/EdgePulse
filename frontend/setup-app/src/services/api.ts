import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { storage } from "./storage";

const api = axios.create({
  baseURL: "https://localhost:7001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storage.getToken();

  if (token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers = new AxiosHeaders(config.headers);
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }

  return config;
});

export default api;