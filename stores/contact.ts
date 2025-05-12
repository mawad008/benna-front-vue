import { defineStore } from 'pinia';
import { useApi } from '@/composables/api';
export const useContactStore = defineStore('contact', {
  state: () => ({
    type: 'message',
    fullName: '',
    phone: '',
    message: '',
    loading: false,
    apiError: '',
    errors: {
      fullName: '',
      phone: '',
      message: '',
    },
  }),
  actions: {
    validateForm() {
      this.errors.fullName = this.fullName ? '' : 'الاسم مطلوب';
      if (!this.phone) {
        this.errors.phone = 'رقم الجوال مطلوب';
      } else {
        const cleanedPhone = this.phone.replace(/\D/g, "").trim();
        this.errors.phone = /^05\d{8}$/.test(cleanedPhone) 
          ? '' 
          : 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام';
      }
      
      this.errors.message = this.message ? '' : 'الرسالة مطلوبة';
      return !this.errors.fullName && !this.errors.phone && !this.errors.message;
    },
    resetForm() {
      this.type = 'message';
      this.fullName = '';
      this.phone = '';
      this.message = '';
      this.errors = { fullName: '', phone: '', message: '' };
      this.apiError = '';
    },
  
    async sendMessage() {
      this.apiError = '';
      this.loading = true;
    
      if (!this.validateForm()) {
        this.loading = false;
        return false;
      }
    
      try {
        const api = useApi();
        await api.post("/api/store/suggestion", {
          type: this.type,
          fullName: this.fullName,
          phone: this.phone,
          message: this.message,
        });
        return true;
      } catch (error) {
        this.apiError = 'حدث خطأ أثناء إرسال النموذج. حاول مرة أخرى.';
        console.error("Send failed", error);
        return false;
      } finally {
        this.loading = false;
      }
    }
    
  },
});
