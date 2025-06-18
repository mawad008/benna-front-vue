import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export const useDonorStore = defineStore("donor", {
  state: () => ({
    donorName: "" as string,
    customAmount: "" as string,
    selectedAmount: "" as string,
    withdrawalOneRiyal: "1" as string,
    recurringType: "day" as string,
    startDate: "",
    errors: {
      donorName: "" as string,
      amount: "" as string,
      startDate: "" as string,
      recurringType: "" as string,
    },
  }),
  actions: {
    getI18n() {
      const { $i18n } = useNuxtApp();
      return $i18n;
    },
    setAmount(amount: string) {
      this.selectedAmount = this.selectedAmount === amount ? "" : amount;
      this.customAmount = "";
      this.errors.amount = "";
    },
    setCustomAmount(value: string) {
      this.customAmount = value.replace(/\D/g, "");
      this.selectedAmount = "";
      this.errors.amount = this.customAmount
        ? ""
        : this.getI18n().t("donationErrors.amountRequired");
    },
    validateDonor() {
      const $t = this.getI18n().t;
      this.errors.donorName = this.donorName.trim()
        ? ""
        : $t("donationErrors.donorNameRequired");
      this.errors.amount =
        this.selectedAmount || this.customAmount
          ? ""
          : $t("donationErrors.amountInvalid");
      this.errors.recurringType = this.recurringType
        ? ""
        : $t("donationErrors.recurringTypeRequired");
      this.errors.startDate = this.validateStartDate()
        ? ""
        : $t("donationErrors.startDateRequired");

      return !Object.values(this.errors).some((error) => error);
    },
    setRecurringType(type: string) {
      this.recurringType = type;
      this.errors.recurringType = "";
    },
    setStartDate(date: string) {
      this.startDate = date;
      this.errors.startDate = this.validateStartDate()
        ? ""
        : this.getI18n().t("donationErrors.startDateRequired");
    },
    validateStartDate() {
      const today = new Date();
      const [day, month, year] = this.startDate.split("-").map(Number);
      const selectedDate = new Date(year, month - 1, day);
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    // compare start date with today
    isStartDateToday() {
      if (!this.startDate) return false;
      const today = new Date();
      const [day, month, year] = this.startDate.split("-").map(Number);
      const selectedDate = new Date(year, month - 1, day);
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      // Just to keep the value to handle refund
      localStorage.setItem("isToday", JSON.stringify(selectedDate.getTime() === today.getTime()));
      return selectedDate.getTime() === today.getTime();
    }
  },
});
