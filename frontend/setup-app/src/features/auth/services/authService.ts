import api from "@/services/api";
import type { LoginRequest, LoginResponse } from "../types";

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", request);

    return data;
  } catch (err: any) {
    // Normalize error message coming from backend if available
    const message =
      err?.response?.data?.message || err?.message || "Login failed";

    throw new Error(message);
  }
};