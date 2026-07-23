import api from "@/services/api";
import type { LoginRequest, LoginResponse } from "../types";

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    "/auth/login",
    request
  );

  return data;
};