import { defineStore } from "pinia";
import { useApi } from "@/composables/api";
import { createGlobalState } from "@vueuse/core";

interface Campaign {
  campaign_id: number;
  amount: number;
  campaign_name: string;
  date: string;
  next_time: string;
  type: "day" | "week" | "month";
  status: number;
}
interface updateCampaign{
  campaign_id: number;
  status: number;
  next_time: string;
}

export const useCampaignsStore = defineStore("campaigns", {
  state: () => ({
    campaigns: [] as Campaign[],
    loading: false,
    statusLoading: false,
    error: null as string | null,
    updateCampaigns: null as updateCampaign | null,

  }),

  actions: {
    async fetchCampaigns(locale:string) {
    
      const { get } = useApi(locale);
      this.loading = true;
      try {
        const response = await get<{ data: Campaign[] }>("/api/campaigns");
        const { data } = response;
        this.campaigns = data.data;
        this.campaigns.forEach((campaign) => {
          campaign.campaign_id = campaign.id;
          campaign.campaign_name = campaign.name;
        });
     
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

async cancelPayment(campaign_id: number) {
  const { post } = useApi();
  this.statusLoading = true;
  try {
    const response = await post("/api/cancel-payment", { payment_status: "pending", campaign_id });
    const { data } = response;
    const index = this.campaigns.findIndex(c => c.campaign_id === campaign_id);
    if (index !== -1) {
      this.campaigns[index] = {
        ...this.campaigns[index],
        status: data.status,
        next_time: data.next_time
      };
    }
    return data; 
  } catch (error: any) {
    this.error = error.message;
    throw error; 
  } finally {
    this.statusLoading = false;
  }
},

async activePayment(campaign_id: number) {
  const { post } = useApi();
  this.statusLoading = true;
  try {
    const response = await post("/api/active-payment", { payment_status: "active", campaign_id });
    const { data } = response;
 
    const index = this.campaigns.findIndex(c => c.campaign_id === campaign_id);
    if (index !== -1) {
      this.campaigns[index] = {
        ...this.campaigns[index],
        status: data.status,
        next_time: data.next_time
      };
    }
    return data; 
  } catch (error: any) {
    this.error = error.message;
    throw error; 
  } finally {
    this.statusLoading = false;
  }
},
  
  },
});
