import { defineStore } from "pinia";

export const useDonorStore = defineStore("donor", {
  state: () => ({
    donorName: "" as string,
    customAmount: "" as string,
    selectedAmount: "" as string,
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
      // this.errors.startDate = this.validateStartDate()
      //   ? ""
      //   : "لا يمكن اختيار تاريخ في الماضي";

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
        : "لا يمكن اختيار تاريخ في الماضي";
    },
    validateStartDate() {
      const today = new Date();
      const [day, month, year] = this.startDate.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day);
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }
    
  },
});
