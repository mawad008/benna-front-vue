import { defineStore } from "pinia";
import { AxiosError } from "axios";
import { useApi } from "@/composables/api";

interface User {
  id: number;
  name: string | null;
  phone: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

interface ApiResponse<T> {
  data: T;
  errors: any;
}
export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    init() {
      this.loading = true;
      if (process.client) {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token) {
          this.token = token;
          this.user = user ? JSON.parse(user) : { id: null, name: null, phone: null };
        }
      }
      this.loading = false;
    },

    setUser(user: User, token: string) {
      this.user = user;
      this.token = token;
      if (process.client) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", user ? JSON.stringify(user) : "");
      }
    },

    logout() {
      this.clearAuth();
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});
