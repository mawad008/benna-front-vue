import { defineStore } from 'pinia';

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    selectedPaymentMethod: '',
    cardholderName: '',
    cardNumber: '',
    expiryDate: '', 
    cvv: '',
    errors: {
      paymentMethod: '',
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  }),
  actions: {
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;
      this.errors.paymentMethod = '';
    },
    validatePayment() {
      this.errors.paymentMethod = this.selectedPaymentMethod ? '' : 'يرجى اختيار طريقة الدفع';
      
      if (['visa', 'mastercard'].includes(this.selectedPaymentMethod)) {
        this.errors.cardholderName = this.cardholderName.trim() ? '' : 'يرجى إدخال اسم حامل البطاقة';
        this.errors.cardNumber = this.cardNumber.length === 16 ? '' : 'يرجى إدخال رقم بطاقة صالح';
        // Validate expiry date
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; 
        if (expiryDateRegex.test(this.expiryDate)) {
          const [month, year] = this.expiryDate.split('/');
          const currentYear = new Date().getFullYear() % 100; 
          const currentMonth = new Date().getMonth() + 1; 

          if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            this.errors.expiryDate = 'يرجى إدخال تاريخ انتهاء صالح';
          } else {
            this.errors.expiryDate = '';
          }
        } else {
          this.errors.expiryDate = 'يرجى إدخال تاريخ انتهاء صالح بتنسيق سنة/شهر';
        }

        this.errors.cvv = this.cvv.length === 3 ? '' : 'يرجى إدخال رمز تحقق صالح';
      }
      
      return !Object.values(this.errors).some(error => error);
    }
  }
});