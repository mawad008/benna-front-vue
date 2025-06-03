import { defineStore } from "pinia";
import { useApi } from "@/composables/api";

interface Deduction {
    id: number;
    name: string;
    amount: number;
    campaign_name: string;
    deduction_date: string;
    status: number;
}

export const useDeductionsStore = defineStore("deductions", {
    state: () => ({
        deductions: [] as Deduction[],
        loading: false,
        error: null as string | null,
        DeductionCampaign: "" as string,
    }),
    actions: {
        async fetchDeductions(campaign_id: number) {
            const { locale } = useI18n();
            const { get } = useApi(locale.value);
            try {
                this.loading = true;
                const response = await get<{ data: Deduction[] }>(`/api/deductions/${campaign_id}`);
                const { data } = response;
                this.deductions = data.data;
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
    
async cancelPayment(deduction_id: number) {
    const { post } = useApi();
    this.loading = true;
    try {
      const response = await post("/api/cancel-payment", { deduction_id });
      const { data } = response;
      const index = this.deductions.findIndex(c => c.id === deduction_id);
      if (index !== -1) {
        this.deductions[index] = {
          ...this.deductions[index],
          status: data.status,
        };
      }
      return data; 
    } catch (error: any) {
      this.error = error.message;
      throw error; 
    } finally {
      this.loading = false;
    }
  },
  async updatePayment(deduction_id: number) {
    // add payload
    const { post } = useApi();
    this.loading = true;
    try {
      const response = await post(`/update/deduction/${deduction_id}`);
      const { data } = response;
      const index = this.deductions.findIndex(c => c.id === deduction_id);
      if (index !== -1) {
        this.deductions[index] = {
          ...this.deductions[index],
          status: data.status,
        };
      }
      return data; 
    } catch (error: any) {
      this.error = error.message;
      throw error; 
    } finally {
      this.loading = false;
    }
  },
    },
});
