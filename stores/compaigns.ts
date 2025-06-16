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
//   {
//     "data": [
//         {
//             "id": 1,
//             "name": "\u0646\u0648\u0631 \u0627\u0644\u062f\u064a\u0646",
//             "amount": "55",
//             "date": "2025-06-16",
//             "type": "week",
//             "status": 2,
//             "next_time": "2025-06-16"
//         }
//     ]
// }

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
    const index = this.campaigns.findIndex(c => c.id === id);
    if (index !== -1) {
      this.campaigns[index] = {
        ...this.campaigns[index],
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

async activePayment(campaign_id: number) {
  const { post } = useApi();
  this.statusLoading = true;
  try {
    const response = await post("/api/update-campaign", { payment_status: "active", campaign_id });
    const { data } = response;
 
    const index = this.campaigns.findIndex(c => c.id === campaign_id);
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
