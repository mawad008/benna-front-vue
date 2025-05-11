import { defineStore } from 'pinia';

export const useDeductionsStore = defineStore('deductions', {
  state: () => ({
    deductions: [] as any[],
    loading: false,
    error: null as any,
  }),
  actions: {
    async fetchDeductions() {
      this.loading = true;
      try {
        const response = await $fetch<{ data: any[] }>(
          '/api/deductions'
        );
        this.deductions = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});