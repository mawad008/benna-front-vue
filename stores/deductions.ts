import { defineStore } from "pinia";

export const useDeductionsStore = defineStore("deductions", {
    state: () => ({
        deductions: [] as any,
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchDeductions(campaigns_id: string | number) {
            try {
                this.loading = true;
                const response = await $fetch(`/api/deductions/${campaigns_id}`);
                this.deductions = response;
            } catch (error) {
                console.error("Error fetching deductions:", error);
                this.error = error as string;
            } finally {
                this.loading = false;
            }
        },
    },
});
