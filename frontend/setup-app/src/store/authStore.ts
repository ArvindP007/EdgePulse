import { create } from "zustand";
import { storage } from "@/services/storage";
import type { LoginResponse } from "@/features/auth/types";

interface AuthState {
  token: string | null;
  user: LoginResponse["user"] | null;

  login: (data: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: storage.getToken(),
  user: null,

  login: (data) => {
    storage.setToken(data.accessToken);

    set({
      token: data.accessToken,
      user: data.user,
    });
  },

  logout: () => {
    storage.clearToken();

    set({
      token: null,
      user: null,
    });
  },
}));