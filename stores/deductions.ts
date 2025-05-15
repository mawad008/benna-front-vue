import { defineStore } from "pinia";


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
            try {
                this.loading = true;
                const response = await $fetch<{ data: Deduction[] }>(`/api/deductions/${campaign_id}`);
                this.deductions = response.data;
            } catch (error) {
                console.error("Error fetching deductions:", error);
                this.error = error as string;
            } finally {
                this.loading = false;
            }
        },
    },
});
