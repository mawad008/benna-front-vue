import { defineStore } from "pinia";
import { useDonorStore } from "./donorStore";
import { usePaymentStore } from "./paymentStore";
import { useApi } from "@/composables/api";

export const useDonationStore = defineStore("donation", {
  state: () => ({
    loading: false,
    submissionError: "",
    campaign_id: null,
  }),

  actions: {
    async submitDonation() {
      const donorStore = useDonorStore();
      const isValidDonor = donorStore.validateDonor();
      let payload: any;

      if (!isValidDonor) {
        this.submissionError = "يرجى ملء جميع الحقول المطلوبة بشكل صحيح.";
        return;
      }

      if (this.campaign_id) {
      payload = {
          name: donorStore.donorName,
          amount: donorStore.selectedAmount || donorStore.customAmount,
          type: donorStore.recurringType,
          date: donorStore.startDate,
          campaign_id: this?.campaign_id,
        };
      } else {
     payload = {
          name: donorStore.donorName,
          amount: donorStore.selectedAmount || donorStore.customAmount,
          type: donorStore.recurringType,
          date: donorStore.startDate,
        };
      }

      const api = useApi();
      this.loading = true;
      this.submissionError = "";

      try {
        const response = await api.post("/api/create/deduction", payload);
        console.log("Donation submitted:", response.data);

        // Reset donor form
        // donorStore.donorName = "";
        // donorStore.selectedAmount = "";
        // donorStore.customAmount = "";
        // donorStore.recurringType = "day";
        // donorStore.startDate = "";

        this.submissionError = "";
      } catch (error: any) {
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          const firstKey = Object.keys(errors)[0];
          this.submissionError = errors[firstKey][0];
        } else if (error.response?.data?.message) {
          this.submissionError = error.response.data.message;
        } else {
          this.submissionError =
            "حدث خطأ أثناء إرسال التبرع، يرجى المحاولة مرة أخرى.";
        }

        console.error("Donation error:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
