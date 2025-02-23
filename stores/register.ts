import { defineStore } from "pinia";

export const useRegisterStore = defineStore("register", {
  state: () => ({
    step: 0 as number,
    phone: "" as string,
    name: "" as string,
    otp: "" as string,
    transitionDirection: "slide-left",
    errors: {
      name: "" as string,
      phone: "" as string,
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
    validatePhone() {
      const phoneRegex = /^\d{9}$/;
      if (!this.phone.trim()) {
        this.errors.phone = "رقم الجوال مطلوب";
      } else if (!phoneRegex.test(this.phone)) {
        this.errors.phone = "رقم الجوال يجب أن يكون 9 أرقام";
      } else {
        this.errors.phone = "";
      }
      return !this.errors.phone;
    },
    validateOtp() {
      const otpRegex = /^\d{4}$/;
      if (!this.otp.trim()) {
        this.errors.otp = "رمز التحقق مطلوب";
      } else if (!otpRegex.test(this.otp)) {
        this.errors.otp = "رمز التحقق يجب أن يكون 4 أرقام";
      } else {
        this.errors.otp = "";
      }
      return !this.errors.otp;
    },
    nextStep() {
      let isValid = false;
      if (this.step === 0) isValid = this.validatePhone();
      else if (this.step === 1) isValid = this.validateName();
      else if (this.step === 2) isValid = this.validateOtp();

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
      this.errors.name = "";
      this.errors.phone = "";
      this.errors.otp = "";
      this.transitionDirection = "slide-left";
    },
  },
});
