import { useRuntimeConfig, navigateTo } from "#app";
import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/auth";

export function useApi(locale?: string) {

  const config = useRuntimeConfig();
  const apiClient: AxiosInstance = axios.create({
    baseURL: "https://ws.donate.benaa.org.sa",
    // baseURL: "http://192.168.2.56:8000",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  });

  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      let token;
      if (process.client) {
        token = localStorage.getItem("token");
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers['Content-Language'] = locale || 'ar';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        const authStore = useAuthStore();
        authStore.clearAuth();
        navigateTo("/" + locale);
      }

      if (error.response) {
        console.error(
          `API Error: ${error.response.status} - ${error.response.data.message}`
        );
      } else {
        console.error(`API Error: ${error.message}`);
      }
      return Promise.reject(error);
    }
  );

  return {
    get: async <T>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      const response = await apiClient.get<T>(url, config);
      return response;
    },
    post: async <T>(
      url: string,
      data: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      const response = await apiClient.post<T>(url, data, config);
      return response;
    },
    patch: async <T>(
      url: string,
      data: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      const response = await apiClient.patch<T>(url, data, config);
      return response;
    },
    put: async <T>(
      url: string,
      data: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      const response = await apiClient.put<T>(url, data, config);
      return response;
    },
    delete: async <T>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      const response = await apiClient.delete<T>(url, config);
      return response;
    },
  };
}
