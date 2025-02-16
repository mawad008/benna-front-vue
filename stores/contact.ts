import { defineStore } from 'pinia';

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
      this.errors.phone = /^\d{9}$/.test(this.phone) ? '' : 'رقم الهاتف يجب أن يكون 9 أرقام';
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
  },
});
