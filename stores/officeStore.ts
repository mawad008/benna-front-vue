import { defineStore } from 'pinia';

export const useOfficeStore = defineStore('office', {
  state: () => ({
    selectedOffice: 'main',
    offices: {
      main: {
        name: 'الإدارة الرئيسية',
        address: 'شارع الملك عبد العزيز، مقابل البنك العربي الوطني، الخبر، المنطقة الشرقية، المملكة العربية السعودية، 31952',
        workingHours: 'من الساعة 9 صباحًا وحتى الساعة 10 مساءً',
        phone1: '00966599781111',
        fax: '0138980075',
        email: 'INFO@BENAA.ORG.SA',
      },
      dammam: {
        name: 'مكتب الدمام',
        address: 'العنوان: شارع الملك فهد، الدمام، المنطقة الشرقية، المملكة العربية السعودية',
        workingHours: 'من الساعة 8 صباحًا وحتى الساعة 9 مساءً',
        phone1: '00966551234567',
        fax: '0138009001',
        email: 'dammam@benaa.org.sa',
      },
      office22: {
        name: 'مكتب 22',
        address: 'العنوان: حي العزيزية، الرياض، المملكة العربية السعودية',
        workingHours: 'من الساعة 10 صباحًا وحتى الساعة 8 مساءً',
        phone1: '00966556667788',
        fax: '0138990011',
        email: 'office22@benaa.org.sa',
      },
      branchRiyadh: {
        name: 'فرع الرياض',
        address: 'العنوان: شارع العليا، الرياض، المملكة العربية السعودية',
        workingHours: 'من الساعة 9 صباحًا وحتى الساعة 6 مساءً',
        phone1: '00966559998877',
        fax: '0138123456',
        email: 'riyadh@benaa.org.sa',
      },
      branchQatif: {
        name: 'فرع القطيف',
        address: 'العنوان: شارع الكورنيش، القطيف، المملكة العربية السعودية',
        workingHours: 'من الساعة 10 صباحًا وحتى الساعة 5 مساءً',
        phone1: '00966554443322',
        fax: '0138990073',
        email: 'qatif@benaa.org.sa',
      }
    }
  }),
  actions: {
    setOffice(officeKey: string) {
      this.selectedOffice = officeKey;
    }
  }
});


// import { defineStore } from 'pinia';
// import { useApi } from '@/composables/api';

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
//     selectedOfficeId: null as number | null,
//     offices: [] as Office[],
//   }),
//   getters: {
//     selectedOffice(state) {
//       return state.offices.find(o => o.id === state.selectedOfficeId) || null;
//     }
//   },
//   actions: {
//     async fetchOffices() {
//       try {
//         const api = useApi();
//         const response = await api.get<{ data: Office[] }>('/api/Branches');
//         this.offices = response.data.data;
//         if (this.offices.length > 0) {
//           this.selectedOfficeId = this.offices[0].id; 
//         }
//       } catch (error) {
//         console.error('Failed to load offices', error);
//       }
//     },
//     setOffice(id: number) {
//       this.selectedOfficeId = id;
//     }
//   }
// });

