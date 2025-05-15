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
    }),
    actions: {
        async fetchDeductions(campaign_id: string | number) {
            const { get } = useApi();
            try {
                this.loading = true;
                const response = await get<{ data: Deduction[] }>(`/api/deductions/${campaign_id}`);
                const { data } = response;
                this.deductions = data.data;
            } catch (error: any) {
                console.error("Error fetching deductions:", error);
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
    },
});
