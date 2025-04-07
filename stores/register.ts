// import { defineStore } from "pinia";

// export const useRegisterStore = defineStore("register", {
//   state: () => ({
//     step: 0 as number,
//     phone: "" as string,
//     name: "" as string,
//     otp: "" as string,
//     transitionDirection: "slide-left",
//     errors: {
//       phone: "" as string,
//       name: "" as string,
//       otp: "" as string,
//     },
//   }),
//   actions: {
//     validateName() {
//       if (!this.name.trim()) {
//         this.errors.name = "الاسم مطلوب";
//       } else if (this.name.trim().length < 2) {
//         this.errors.name = "الاسم يجب أن يكون حرفين على الأقل";
//       } else {
//         this.errors.name = "";
//       }
//       return !this.errors.name;
//     },
    
//     nextStep() {
//       let isValid = false;
//       if (this.step === 0) {
//         isValid = !this.errors.phone && !!this.phone.trim();
//       } else if (this.step === 1) {
//         isValid = this.validateName();
//       } else if (this.step === 2) {
//         isValid = !this.errors.otp && !!this.otp.trim();
//       }

//       if (isValid && this.step < 3) {
//         this.transitionDirection = "slide-left";
//         this.step++;
//       }
//     },

//     prevStep() {
//       if (this.step > 0) {
//         this.transitionDirection = "slide-right";
//         this.step--;
//       }
//     },

//     reset() {
//       this.step = 0;
//       this.phone = "";
//       this.name = "";
//       this.otp = "";
//       this.errors.phone = "";
//       this.errors.name = "";
//       this.errors.otp = "";
//       this.transitionDirection = "slide-left";

//     },
//   },
 
// });


import { defineStore } from "pinia";
import { useApi } from "@/composables/api";

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
        const response = await api.post('/api/create/record', payload);
        console.log('Submitted user successfully:', response.data);
         this.nextStep();
      } catch (error: any) {
        if (error.response?.data?.errors?.name) {
          this.errors.name = error.response.data.errors.name[0];
        }
      }
    },

    async ValidateOTP() {
      const api = useApi();
      try {
        const payload = {
          otp: this.otp,
          phone: this.phone, 
        };
        const response = await api.post<{ data: { token: string } }>('/api/valid/otp', payload);
        console.log('Submitted otp successfully:', response.data);
         this.nextStep();
      } catch (error: any) {
        if (error.response?.data?.errors?.name) {
          this.errors.name = error.response.data.errors.name[0];
        }
      }
    },
    
    async ResendOTP() {
      const api = useApi();
      try {
        const payload = {
          phone: this.phone, 
        };
        const response = await api.post<{ data: { token: string } }>('/api/resend/otp', payload);
        console.log('Resend OTP successfully:', response.data);
         this.nextStep();
      } catch (error: any) {
        if (error.response?.data?.errors?.name) {
          this.errors.name = error.response.data.errors.name[0];
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
  },
});
