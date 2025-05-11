import { defineStore } from "pinia";

export const useDonorStore = defineStore("donor", {
  state: () => ({
    donorName: "",
    customAmount: "",
    selectedAmount: "" as string,
    recurringType: "daily",
    startDate: new Date(),
    errors: {
      donorName: "",
      amount: "",
      startDate: "",
      recurringType: "",
    },
  }),
  actions: {
    setAmount(amount: string) {
      this.selectedAmount = this.selectedAmount === amount ? "" : amount;
      this.customAmount = "";
      this.errors.amount = "";
    },
    setCustomAmount(value: string) {
      this.customAmount = value.replace(/\D/g, "");
      this.selectedAmount = "";
      this.errors.amount = this.customAmount ? "" : "يرجى إدخال مبلغ صالح";
    },
    validateDonor() {
      this.errors.donorName = this.donorName.trim()
        ? ""
        : "يرجى إدخال اسم المتبرع";
      this.errors.amount =
        this.selectedAmount || this.customAmount
          ? ""
          : "يرجى تحديد أو إدخال مبلغ التبرع";
      this.errors.recurringType = this.recurringType
        ? ""
        : "يرجى اختيار نوع الاستقطاع الدوري";
      this.errors.startDate = this.validateStartDate()
        ? ""
        : "لا يمكن اختيار تاريخ في الماضي";

      return !Object.values(this.errors).some((error) => error);
    },
    setRecurringType(type: string) {
      this.recurringType = type;
      this.errors.recurringType = "";
    },
    setStartDate(date: Date) {
      this.startDate = date;
      this.errors.startDate = this.validateStartDate()
        ? ""
        : "لا يمكن اختيار تاريخ في الماضي";
    },
    validateStartDate() {
      const today = new Date();
      return this.startDate.getTime() >= today.getTime();
    },
  },
});
