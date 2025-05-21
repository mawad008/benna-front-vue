import { defineStore } from "pinia";
import { useApi } from "@/composables/api";
import { createGlobalState } from "@vueuse/core";
interface Campaign {
  id: number;
  amount: number;
  name: string;
  date: string;
  type: "day" | "week" | "month";
  status: "continuous" | "stopped";
}


export const useCampaignsStore = defineStore("campaigns", {
  state: () => ({
    campaigns: [] as Campaign[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCampaigns() {
      const { get } = useApi();
      this.loading = true;
      try {
        const response = await get<{ data: Campaign[] }>("/api/campaigns");
        const { data } = response;
        this.campaigns = data.data;
        // console.log(this.campaigns);
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async cancelPayment(campaign_id: number) {
      const { post } = useApi();
      this.loading = true;
      try {
        await post("/api/cancel-payment", { payment_status: "pending" , campaign_id: campaign_id});
        this.fetchCampaigns();
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async activePayment(campaign_id: number) {
      const { post } = useApi();
      this.loading = true;
      try {
        await post("/api/active-payment", { payment_status: "active" , campaign_id: campaign_id});
        this.fetchCampaigns();
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  
  },
});
