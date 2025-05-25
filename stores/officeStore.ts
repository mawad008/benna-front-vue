// import { defineStore } from 'pinia';


// interface Office {
//   id: number;
//   name: string;
//   location: string;
//   ifram: string;
//   worktime: string;
//   phone: string;
//   email: string;
// }

// export const useOfficeStore = defineStore('office', {
//   state: () => ({
//     offices: [] as Office[],
//     loading: false,
//     error: null as string | null,
//   }),
//   actions: {
//     async fetchOffices() {
//       const { get } = useApi();
//       this.loading = true;
//       try {
//         const response = await get<{ data: Office[] }>('/api/Branches');
//         const { data } = response;
//         this.offices = data.data;
//         // console.log(this.deductions);
//       } catch (error: any) {
//         this.error = error.message;
//       } finally {
//         this.loading = false;
//       }
//     },
//   }
// });


import { defineStore } from 'pinia';
import { useApi } from '@/composables/api';

interface Office {
  id: number;
  name: string;
  location: string;
  ifram: string;
  worktime: string;
  phone: string;
  email: string;
}

export const useOfficeStore = defineStore('office', {
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
        const response = await get<{ data: Office[] }>('/api/Branches');
        this.offices = response.data.data;
     
      } catch (error) {
        console.error('Failed to load offices', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchSocial() {
      const { locale } = useI18n();
      const { get } = useApi(locale.value);
      try {
        this.loading = true;
        const response = await get<{ data: any }>('/api/social');
        const { data } = response;
        this.social = data;
     
      } catch (error) {
        console.error('Failed to load social', error);
      } finally {
        this.loading = false;
      }
    },
  }
});

