import { defineStore } from "pinia";
import { useApi } from "@/composables/api";
interface Deduction {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: "يومي" | "اسبوعي" | "شهري";
  status: "مستمر" | "متوقف";
}


export const useDeductionsStore = defineStore("deductions", {
  state: () => ({
    deductions: [] as Deduction[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchDeductions() {
      const api = useApi();
      this.loading = true;
      try {
        const response = await api.get<Deduction[]>("/api/deductions");
        this.deductions = response.data;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
