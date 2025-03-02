import { defineStore } from "pinia";

export const useRegisterStore = defineStore("register", {
  state: () => ({
    step: 0 as number,
    phone: "" as string,
    name: "" as string,
    otp: "" as string,
    transitionDirection: "slide-left",
    errors: {
      phone: "" as string,
      name: "" as string,
      otp: "" as string,
    },
  }),
  actions: {
    validateName() {
      if (!this.name.trim()) {
        this.errors.name = "الاسم مطلوب";
      } else if (this.name.trim().length < 2) {
        this.errors.name = "الاسم يجب أن يكون حرفين على الأقل";
      } else {
        this.errors.name = "";
      }
      return !this.errors.name;
    },
    
    nextStep() {
      let isValid = false;
      if (this.step === 0) {
        isValid = !this.errors.phone && !!this.phone.trim();
      } else if (this.step === 1) {
        isValid = this.validateName();
      } else if (this.step === 2) {
        isValid = !this.errors.otp && !!this.otp.trim();
      }

      if (isValid && this.step < 3) {
        this.transitionDirection = "slide-left";
        this.step++;
      }
    },

    prevStep() {
      if (this.step > 0) {
        this.transitionDirection = "slide-right";
        this.step--;
      }
    },

    reset() {
      this.step = 0;
      this.phone = "";
      this.name = "";
      this.otp = "";
      this.errors.phone = "";
      this.errors.name = "";
      this.errors.otp = "";
      this.transitionDirection = "slide-left";
    },
  },
});
