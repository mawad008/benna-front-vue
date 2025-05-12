import { defineStore } from "pinia";
import { useApi } from "@/composables/api";
import { useAuthStore } from "@/stores/auth";

interface User {
  name: string;
  phone: string;
}

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

    async Register() {
      const api = useApi();
      try {
        const payload = {
          name: this.name,
          phone: this.phone,
        };
        const response = await api.post("/api/register", payload);
        console.log("Submitted user successfully:", response.data);
        this.errors.name = "";
        this.nextStep();
      } catch (error: any) {
        if (error.response?.data?.errors?.name) {
          this.errors.name = error.response.data.errors.name[0];
        } else if (error.response?.data?.message) {
          this.errors.name = error.response.data.message;
        } else {
          this.errors.name = "حدث خطأ غير متوقع، يرجى المحاولة لاحقًا.";
        }
      }
    },

    async ValidateOTP() {
      const api = useApi();
      const authStore = useAuthStore();
      try {
        const payload = {
          otp: this.otp,
          phone: this.phone,
        };
        const response = await api.post<{
          data: { token: string; user: User };
        }>("/api/valid/otp", payload);
        console.log("Submitted otp successfully:", response.data);
        const { token, user } = response.data.data;
        authStore.setUser(user, token);
        this.nextStep();
      } catch (error: any) {
        if (error.response?.data?.errors?.otp) {
          this.errors.otp = error.response.data.errors.otp[0];
        } else {
          this.errors.otp = "رمز OTP غير صالح";
        }
      }
    },

    async ResendOTP() {
      const api = useApi();
      try {
        const payload = {
          phone: this.phone,
        };
        const response = await api.post("/api/resend/otp", payload);
        console.log("Resend OTP successfully:", response.data);
      } catch (error: any) {
        if (error.response?.data?.errors?.phone) {
          this.errors.phone = error.response.data.errors.phone[0];
        } else {
          this.errors.phone = "فشل إعادة إرسال OTP";
        }
      }
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
    resetErrors() {
      this.errors = {
        phone: "",
        name: "",
        otp: "",
      };
    },
  },
});
