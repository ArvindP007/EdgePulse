import axios from "axios";
import { storage } from "./storage";

const api = axios.create({
  baseURL: "https://localhost:7001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;