import { defineStore } from "pinia";
import { useApi } from "@/composables/api";
import { useAuthStore } from "@/stores/auth";

interface User {
  name: string;
  phone: string;
}

export const useRegisterStore = defineStore("register", {
  state: () => ({
    mode: "login" as "login" | "register",
    hasUser: false,
    step: 0 as number,
    phone: "" as string,
    name: "" as string,
    otp: "" as string,
    transitionDirection: "slide-left",
    errors: {
      phone: "" as string,
      name: "" as string,
      otp: "" as string,
      loginPhone: "" as string,
      loginOtp: "" as string,
    },
    registerToken: "" as string,
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

    async RegisterStepOne(locale: string) {
      const { post } = useApi(locale);
      try {
        const payload = {
          phone: this.phone,
        };
        const response = await post("/api/register", payload, {
          params: {
            step: 0,
          },
        });
        // console.log("Submitted user successfully:", response.data);
        this.registerToken = response.data.registration_token;
        this.errors.phone = "";
        this.mode = "register";
        this.nextStep();
      } catch (error: any) {
        if (error.response?.data?.errors?.phone) {
          this.errors.phone = error.response.data.errors.phone[0];
        } else if (error.response?.data?.message) {
          this.errors.phone = error.response.data.message;
        } else {
          this.errors.phone = "حدث خطأ غير متوقع، يرجى المحاولة لاحقًا.";
        }
      }
    },
    async RegisterStepTwo(locale: string) {
      const { post } = useApi(locale);
      try {
        const payload = {
          name: this.name,
          phone: this.phone,
          registration_token: this.registerToken,
        };
        const response = await post("/api/register", payload, {
          params: {
            step: 1,
          },
        });
        // console.log("Submitted user successfully:", response.data);
        this.errors.name = "";
        this.mode = "register";
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

    async Login(locale: string) {
      const { post } = useApi(locale);

      try {
        const payload = {
          phone: this.phone,
        };
        const response = await post("/api/login", payload);
        this.errors.loginPhone = "";
        this.mode = "login";
        this.nextStep();
      } catch (error: any) {
        if (error.response?.data?.errors?.phone) {
          this.errors.loginPhone = error.response.data.errors.phone[0];
        } else if (error.response?.data?.message) {
          this.errors.loginPhone = error.response.data.message;
        } else {
          this.errors.loginPhone = "حدث خطأ غير متوقع، يرجى المحاولة لاحقًا.";
        }
      }
    },

    async ValidateOTP(locale: string) {
      const { post } = useApi(locale);
      const authStore = useAuthStore();
      try {
        const payload = {
          otp: this.otp,
          phone: this.phone,
        };
        const response = await post("/api/valid/otp", payload);
        const { token, user } = response.data;
        this.hasUser = true;
        authStore.setUser(user, token);
        this.nextStep();
      } catch (error: any) {
        if (error.response) {
          this.errors.otp = error.response.data.error;
        } else {
          this.errors.otp = "رمز التحقق غير صالح";
        }
      }
    },

    async ResendOTP(locale: string) {
      const { post } = useApi(locale);
      try {
        const payload = {
          phone: this.phone,
        };
        const response = await post("/api/resend/otp", payload);
      } catch (error: any) {
        if (error.response?.data?.errors?.phone) {
          this.errors.phone = error.response.data.errors.phone[0];
        } else {
          this.errors.phone = "فشل إعادة إرسال رمز التحقق";
        }
      }
    },

    nextStep() {
      let isValid = false;
      if (this.mode === "register") {
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
      } else if (this.mode === "login") {
        if (this.step === 0) {
          isValid = !this.errors.phone && !!this.phone.trim();
        } else if (this.step === 1) {
          isValid = !this.errors.otp && !!this.otp.trim();
        }
        if (isValid && this.step < 2) {
          this.transitionDirection = "slide-left";
          this.step++;
        }
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
      this.errors.loginPhone = "";
      this.errors.loginOtp = "";
      this.transitionDirection = "slide-left";
    },
    resetErrors() {
      this.errors = {
        phone: "",
        name: "",
        otp: "",
        loginPhone: "",
        loginOtp: "",
      };
    },
  },
});
