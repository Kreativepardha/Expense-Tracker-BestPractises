import { create } from "zustand";
import { api } from "../lib/api";

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  fetchUser: async () => {
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },

  login: async (email, password) => {
    await api.post("/auth/login", { email, password });
    await useAuthStore.getState().fetchUser();
  },

  logout: async () => {
    await api.get("/auth/logout");
    set({ user: null, isAuthenticated: false });
  },
}));
