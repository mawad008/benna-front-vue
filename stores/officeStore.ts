import { defineStore } from "pinia";
import { useApi } from "@/composables/api";

interface Office {
  id: number;
  name: string;
  location: string;
  ifram: string;
  worktime: string;
  phone: string;
  email: string;
}
interface Social {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
}

export const useOfficeStore = defineStore("office", {
  state: () => ({
    offices: [] as Office[],
    loading: false,
    error: null as string | null,
    social: null as any,
  }),
  actions: {
    async fetchOffices() {
      const { locale } = useI18n();
      const { get } = useApi(locale.value);
      try {
        this.loading = true;
        const response = await get<{ data: Office[] }>("/api/Branches");
        this.offices = response.data.data;
      } catch (error) {
        console.error("Failed to load offices", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchSocial() {
      const { locale } = useI18n();
      const { get } = useApi(locale.value);
      try {
        this.loading = true;
        const response = await get<{ data: any }>("/api/social");
        const { data } = response.data;
        this.social = data;
      } catch (error) {
        console.error("Failed to load social", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
