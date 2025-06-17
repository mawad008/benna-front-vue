import { defineStore } from "pinia";
import { useApi } from "@/composables/api";
import { createGlobalState } from "@vueuse/core";

// interface Campaign {
//   campaign_id: number;
//   amount: number;
//   campaign_name: string;
//   date: string;
//   next_time: string;
//   type: "day" | "week" | "month";
//   status: number;
// }
interface updateCampaign{
  campaign_id: number;
  status: number;
  next_time: string;
}
interface Campaign{
  id: number;
  parent_id: number;
  name: string;
  amount: string;
  date: string;
  type: string;
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
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

async cancelPayment(id: number) {
  const { post } = useApi();
  this.statusLoading = true;
  console.log(id);
  try {
    const response = await post("/api/cancel-payment", 
      { deduction_id:id });
    const { data } = response;
    const updateCampaign = this.campaigns.findIndex(c => c.id === id);
    if (updateCampaign !== -1) {
      this.campaigns[updateCampaign] = {
        ...this.campaigns[updateCampaign],
        status: data.status,
        next_time: data.next_time
      };
    }
    console.log(data);
    return data; 
  } catch (error: any) {
    this.error = error.message;
    throw error; 
  } finally {
    this.statusLoading = false;
  }
},

async activePayment(id: number) {
  const { post } = useApi();
  this.statusLoading = true;
  try {
    const response = await post("/api/active-payment",  { deduction_id:id });
    const { data } = response;
 
    const updateCampaign = this.campaigns.findIndex(c => c.id === id);
    if (updateCampaign !== -1) {
      this.campaigns[updateCampaign] = {
        ...this.campaigns[updateCampaign],
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
