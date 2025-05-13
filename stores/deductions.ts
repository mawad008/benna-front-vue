import { defineStore } from "pinia";
import { useApi } from "@/composables/api";
interface Deduction {
  id: number;
  amount: number;
  name: string;
  date: string;
  type: "day" | "week" | "month";
  status: "continuous" | "stopped";
}


export const useDeductionsStore = defineStore("deductions", {
  state: () => ({
    deductions: [] as Deduction[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchDeductions() {
      const { get } = useApi();
      this.loading = true;
      try {
        const response = await get<{ data: Deduction[] }>("/api/deductions");
        const { data } = response;
        this.deductions = data.data;
        // console.log(this.deductions);
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async cancelPayment() {
      const { post } = useApi();
      this.loading = true;
      try {
        await post("/api/cancel-payment", { payment_status: "pending" });
        this.fetchDeductions();
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async activePayment() {
      const { post } = useApi();
      this.loading = true;
      try {
        await post("/api/active-payment", { payment_status: "active" });
        this.fetchDeductions();
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
