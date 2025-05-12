import { defineStore } from "pinia";
import { useApi } from "@/composables/api";
import { useAuthStore } from "@/stores/auth";

interface Deduction {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: "يومي" | "اسبوعي" | "شهري";
  status: "مستمر" | "متوقف";
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export const useDeductionsStore = defineStore("deductions", {
  state: () => ({
    deductions: [] as Deduction[],
    loading: false,
    error: null as string | null,
    lastFetchAttempt: null as Date | null,
  }),

  getters: {
    hasError: (state) => state.error !== null,
    wasRecentlyFetched: (state) => {
      if (!state.lastFetchAttempt) return false;
      const now = new Date();
      return now.getTime() - state.lastFetchAttempt.getTime() < 30000; 
    },
  },

  actions: {
    async fetchDeductions(force = false) {
      if (this.loading || (!force && this.wasRecentlyFetched)) {
        console.log("Skipping fetch: loading or recently fetched");
        return;
      }

      const api = useApi();
      this.loading = true;
      this.error = null;
      this.lastFetchAttempt = new Date();

      try {
        console.log("Fetching deductions from /api/deductions");
        const response = await api.get<ApiResponse<Deduction[]>>(
          "/api/deductions",
          {
            timeout: 15000, 
          }
        );
        console.log("API response:", response);

        if (!response.data?.success) {
          throw new Error(
            response.data?.message || "استجابة غير صالحة من الخادم"
          );
        }

        this.deductions = response.data.data || [];
        console.log("Deductions updated:", this.deductions);
      } catch (error: any) {
        console.error("fetchDeductions error:", error);

        if (error.code === "ECONNABORTED") {
          this.error = "انتهت مهلة الاتصال بالخادم";
        } else if (error.response?.status === 401) {
          this.error = "يرجى تسجيل الدخول لعرض التبرعات";
          const authStore = useAuthStore();
          authStore.logout(); 
        } else if (error.response?.status === 403) {
          this.error = "ليس لديك إذن لعرض التبرعات";
        } else if (error.response?.status === 404) {
          this.error = "مسار API غير موجود";
        } else if (error.response?.status === 500) {
          this.error = "خطأ داخلي في الخادم";
        } else {
          this.error =
            error.message || "حدث خطأ غير متوقع أثناء تحميل التبرعات";
        }

        this.deductions = [];
        throw error; 
      } finally {
        this.loading = false;
      }
    },

    async updateDeductionStatus(id: number, newStatus: "مستمر" | "متوقف") {
      const api = useApi();
      this.error = null;

      try {
        console.log(`Updating deduction ${id} status to ${newStatus}`);
        const response = await api.patch<ApiResponse<Deduction>>(
          `/api/deductions/${id}/status`,
          { status: newStatus },
          { timeout: 10000 }
        );

        if (!response.data?.success) {
          throw new Error(response.data?.message || "فشل تحديث الحالة");
        }

        const index = this.deductions.findIndex((d) => d.id === id);
        if (index !== -1) {
          this.deductions[index].status = newStatus;
        }
        console.log("Deduction status updated:", this.deductions[index]);

        return true;
      } catch (error: any) {
        console.error("updateDeductionStatus error:", error);

        let errorMessage = "فشل تحديث حالة التبرع";
        if (error.response?.status === 404) {
          errorMessage = "التبرع غير موجود";
        } else if (error.response?.status === 400) {
          errorMessage = "طلب غير صالح";
        }

        this.error = error.response?.data?.message || errorMessage;
        throw new Error(this.error);
      }
    },

    clearError() {
      this.error = null;
    },

    reset() {
      this.deductions = [];
      this.loading = false;
      this.error = null;
      this.lastFetchAttempt = null;
    },
  },
});
