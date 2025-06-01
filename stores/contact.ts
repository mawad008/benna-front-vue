import { defineStore } from 'pinia';
import { useApi } from '@/composables/api';
export const useContactStore = defineStore('contact', {
  state: () => ({
    type: 'message',
    name: '',
    phone: '',
    note: '',
    loading: false,
    apiError: '',
    errors: {
      name: '',
      phone: '',
      note: '',
    },
  }),
  actions: {
    validateForm() {
      this.errors.name = this.name ? '' : 'الاسم مطلوب';
      if (!this.phone) {
        this.errors.phone = 'رقم الجوال مطلوب';
      } else {
        const cleanedPhone = this.phone.replace(/\D/g, "").trim();
        this.errors.phone = /^05\d{8}$/.test(cleanedPhone) 
          ? '' 
          : 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام';
      }
      
      this.errors.note = this.note ? '' : 'الرسالة مطلوبة';
      return !this.errors.name && !this.errors.phone && !this.errors.note;
    },
    resetForm() {
      this.type = 'message';
      this.name = '';
      this.phone = '';
      this.note = '';
      this.errors = { name: '', phone: '', note: '' };
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
          status: this.type,
          name: this.name,
          phone: this.phone,
          note: this.note,
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
