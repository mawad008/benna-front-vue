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

// interface DeductionCampaign {
//     name: string;
// }

export const useDeductionsStore = defineStore("deductions", {
    state: () => ({
        deductions: [] as Deduction[],
        loading: false,
        error: null as string | null,
        DeductionCampaign: "" as string,
    }),
    actions: {
        async fetchDeductions(campaign_id: number) {
            const { get } = useApi();
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
    },
});
