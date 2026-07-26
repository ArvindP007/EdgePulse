import { isAxiosError } from "axios";

import api from "@/services/api";
import type { LoginRequest, LoginResponse } from "../types";

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", request);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message ?? error.message ?? "Login failed";

      throw new Error(message, { cause: error });
    }

    throw new Error("Login failed", { cause: error });
  }
};