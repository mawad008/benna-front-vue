import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    selectedPaymentMethod: "",
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    errors: {
      paymentMethod: "",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  }),
  actions: {
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;
      this.errors.paymentMethod = "";
    },
    validatePayment() {
      this.errors.paymentMethod = this.selectedPaymentMethod
        ? ""
        : "يرجى اختيار طريقة الدفع";

      if (["visa", "mastercard"].includes(this.selectedPaymentMethod)) {
        this.errors.cardholderName = this.cardholderName.trim()
          ? ""
          : "يرجى إدخال اسم حامل البطاقة";
        this.errors.cardNumber =
          this.cardNumber.length === 16 ? "" : "يرجى إدخال رقم بطاقة صالح";

        // Validate expiry date
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const expiryDate = `${this.expiryMonth}/${this.expiryYear}`;
        if (expiryDateRegex.test(expiryDate)) {
          const currentYear = new Date().getFullYear() % 100;
          const currentMonth = new Date().getMonth() + 1;

          if (
            parseInt(this.expiryYear) < currentYear ||
            (parseInt(this.expiryYear) === currentYear &&
              parseInt(this.expiryMonth) < currentMonth)
          ) {
            this.errors.expiryDate = "يرجى إدخال تاريخ انتهاء صالح";
          } else {
            this.errors.expiryDate = "";
          }
        } else {
          this.errors.expiryDate =
            "يرجى إدخال تاريخ انتهاء صالح بتنسيق سنة/شهر";
        }

        this.errors.cvv =
          this.cvv.length === 3 ? "" : "يرجى إدخال رمز تحقق صالح";
      }

      return !Object.values(this.errors).some((error) => error);
    },
//This Fuction is only used to give the BE the ability to refund the payment with payment ID, But it is not used in the FE
   async refundPayment(payment_id: string) {
      const { locale } = useI18n();
      const { post } = useApi(locale.value);
      try {
        const response = await post(`/api/refund-payment?payment_id=${payment_id}`);
        return response;
      } catch (error: any) {
        console.error("Refund payment failed", error);
        throw error;
      }
    },
  },
});
