import { defineStore } from 'pinia';

interface RowData {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: string;
  status: string;
}

export const useActionsStore = defineStore('actions', {
  actions: {
    updatePaymentData(row: RowData) {
      console.log('Updating payment data for:', row);
    },

    toggleDonationStatus(row: RowData) {
      console.log('Toggling donation status for:', row);
   
      row.status = row.status === 'مستمر' ? 'متوقف' : 'مستمر';
    },
  },
});