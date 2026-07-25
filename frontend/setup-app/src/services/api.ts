import axios, { type AxiosRequestConfig } from "axios";
import { storage } from "./storage";

const api = axios.create({
  baseURL: "https://localhost:7001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: AxiosRequestConfig | any) => {
  const token = storage.getToken();

  if (token) {
    // Ensure headers object exists and set Authorization
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;