import { defineStore } from "pinia";
import { useApi } from "@/composables/api";

interface DeductionHistory {
  id: number;
  name: string;
  amount: number;
  campaign_name: string;
  deduction_date: string;
  status: number;
  is_creditcard_confirmed: number;
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
  },
});
