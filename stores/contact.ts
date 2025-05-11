import { defineStore } from 'pinia';
import { useApi } from '@/composables/api';
export const useContactStore = defineStore('contact', {
  state: () => ({
    type: 'message', 
    fullName: '',
    phone: '',
    message: '',
    errors: {
      fullName: '',
      phone: '',
      message: '',
    },
  }),
  actions: {
    validateForm() {
      this.errors.fullName = this.fullName ? '' : 'الاسم مطلوب';
      this.errors.message = this.message ? '' : 'الرسالة مطلوبة';

      return !this.errors.fullName && !this.errors.phone && !this.errors.message;
    },
    resetForm() {
      this.type = 'message';
      this.fullName = '';
      this.phone = '';
      this.message = '';
      this.errors = { fullName: '', phone: '', message: '' };
    },
    async sendMessage() {
      if (!this.validateForm()) return;
      try {
        const api = useApi();
        await api.post('/api/Contact', {
          type: this.type,
          fullName: this.fullName,
          phone: this.phone,
          message: this.message,
        });
        this.resetForm();
      } catch (error) {
        console.error('Failed to send message', error);
      }
    },
  },
});
