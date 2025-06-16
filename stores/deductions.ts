import { defineStore } from "pinia";
import { useApi } from "@/composables/api";

interface DeductionHistory {
  id: number;
  name: string;
  amount: number;
  campaign_name: string;
  deduction_date: string;
  status: number;
}

export const useDeductionHistoryStore = defineStore("deductionHistory", {
  state: () => ({
    deductionHistory: [] as DeductionHistory[],
    loading: false,
    error: null as string | null,
    DeductionCampaign: "" as string,
  }),
  actions: {
    async fetchDeductions(id: number) {
      const { locale } = useI18n();
      const { get } = useApi(locale.value);
      try {
        this.loading = true;
        const response = await get<{ data: DeductionHistory[] }>(
          `/api/deductions/${id}`
        );
        const { data } = response;
        this.deductionHistory = data.data;
        this.DeductionCampaign = data.data[0].campaign_name;
      } catch (error: any) {
        console.error("Error fetching deductions:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    getCampaignName() {
      return this.DeductionCampaign;
    },
    // async cancelPayment(deduction_id: number) {
    //   const { post } = useApi();
    //   this.loading = true;
    //   try {
    //     const response = await post<{ data: DeductionHistory }>(
    //       "/api/cancel-payment",
    //       { deduction_id }
    //     );
    //     const { data } = response;
    //     const index = 
    //     this.deductionHistory.findIndex((c) => c.id === deduction_id);
    //     if (index !== -1) {
    //       this.deductionHistory[index] = {
    //         ...this.deductionHistory[index],
    //         status: data.data.status,
    //       };
    //     }
    //     console.log(data.data.status);
    //     return data;
    //   } catch (error: any) {
    //     this.error = error.message;
    //     throw error;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  },
});
