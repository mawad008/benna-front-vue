import { defineStore } from "pinia";
import { useDonorStore } from "./donorStore";
import { usePaymentStore } from "./paymentStore";

export const useDonationStore = defineStore("donation", {
  state: () => ({
    submissionError: "",
  }),
  actions: {
    async submitDonation() {
      const donorStore = useDonorStore();
      // const paymentStore = usePaymentStore();

      const isValidDonor = donorStore.validateDonor();
      // const isValidPayment = paymentStore.validatePayment();

      // if (!isValidDonor || !isValidPayment) {
        if (!isValidDonor) {
        this.submissionError = "يرجى ملء جميع الحقول المطلوبة بشكل صحيح.";
        return;
      }

      const donationData = {
        donorName: donorStore.donorName,
        amount: donorStore.selectedAmount || donorStore.customAmount,
        recurringType: donorStore.recurringType,
        startDate: donorStore.startDate,
        // paymentDetails: {
        //   selectedPaymentMethod: paymentStore.selectedPaymentMethod,
        //   cardholderName: paymentStore.cardholderName,
        //   cardNumber: paymentStore.cardNumber,
        //   expiryDate: paymentStore.expiryDate,
        //   cvv: paymentStore.cvv,
        // },
      };

      console.log("Submitting donation:", donationData);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Reset donor store
        donorStore.donorName = "";
        donorStore.selectedAmount = null;
        donorStore.customAmount = "";
        donorStore.recurringType = "daily";
        donorStore.startDate = new Date();

        // Reset payment store
        // paymentStore.selectedPaymentMethod = "";
        // paymentStore.cardholderName = "";
        // paymentStore.cardNumber = "";
        // paymentStore.expiryDate = "";
        // paymentStore.cvv = "";

        this.submissionError = "";
        // alert('تم التبرع بنجاح!');
      } catch (error) {
        this.submissionError =
          "حدث خطأ أثناء إرسال التبرع، يرجى المحاولة مرة أخرى.";
      }
    },
  },
});
