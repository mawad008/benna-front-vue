import { defineStore } from "pinia";
import { useDonorStore } from "./donorStore";
import { useApi } from "@/composables/api";
import { useNuxtApp } from "#app";
interface donation {
  id: number;
  name: string;
  amount: number;
  type: string;
  date: string;
  campaign_id: number;

}
interface updateDonation {
  rowId: number;

}

export const useDonationStore = defineStore("donation", {
  state: () => ({
    loading: false,
    submissionError: "",
    campaign_id: null,
    showPayment: false,
    donation: null as donation | null,
    updateDonation: null as updateDonation | null,
  }),

  actions: {
    getI18n() {
      const { $i18n } = useNuxtApp();
      return $i18n;
    },
    async submitDonation(campaign_id?: number) {
      const donorStore = useDonorStore();
      const isValidDonor = donorStore.validateDonor();
      let payload: any;

      if (!isValidDonor) {
        this.submissionError = this.getI18n().t(
          "donationErrors.submissionRequired"
        );
        return;
      }
      if (campaign_id) {
        payload = {
          name: donorStore.donorName,
          amount: donorStore.selectedAmount || donorStore.customAmount,
          type: donorStore.recurringType,
          date: donorStore.startDate,
          campaign_id: campaign_id,
        };
      } else {
        payload = {
          name: donorStore.donorName,
          amount: donorStore.selectedAmount || donorStore.customAmount,
          type: donorStore.recurringType,
          date: donorStore.startDate,
        };
      }
      const { post } = useApi();
      this.loading = true;
      this.submissionError = "";

      try {
        // console.log(payload);
        const response = await post("/api/create/deduction?step=0", payload);
        const { data } = response;
        // this.donation = data.data;
        // localStorage.setItem("donation", this.donation?.id?.toString());
        localStorage.setItem("deductionToken", data.registration_token);
        // console.log(this.donation?.id);
        // console.log("Donation submitted:", response.data);

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
    async updatePayment(deduction_id: number) {
      const updateDonation: updateDonation = {
        rowId: deduction_id,
      };
      const donorStore = useDonorStore();
      localStorage.setItem("updateDeductionRow", updateDonation.rowId?.toString());
      const payload = {
        name: donorStore.donorName,
        amount: donorStore.selectedAmount || donorStore.customAmount,
        type: donorStore.recurringType,
        date: donorStore.startDate,
      };
      // console.log("Payload for update:", payload);
      const { post } = useApi();
      this.loading = true;
      try {
        const response = await post(
          `api/update/deduction/${updateDonation.rowId}?step=0`,
          payload
        );
        const { data } = response;
        localStorage.setItem("deductionToken", data.registration_token);
        // const index = this.deductions.findIndex((c) => c.id === deduction_id);
        // if (index !== -1) {
        //   this.deductions[index] = {
        //     ...this.deductions[index],
        //     status: data.status,
        //   };
        // }
        return data;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
