import { defineStore } from "pinia";
import { AxiosError } from "axios";
import { useApi } from "@/composables/api";

interface User {
  name: string;
  phone: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface ApiResponse<T> {
  data: T;
  errors: any;
}
export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    init() {
      if (process.client) {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token && user) {
          this.token = token;
          this.user = JSON.parse(user);
        }
      }
    },

    setUser(user: User, token: string) {
      this.user = user;
      this.token = token;
      if (process.client) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
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
