import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    step: 0 as number,
    phone: '' as string,
    name: '' as string,
    otp: '' as string,
    transitionDirection: 'slide-left',
  }),
  actions: {
    nextStep() {
      if (this.step < 3) {
        this.transitionDirection = 'slide-left'; 
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 0) {
        this.transitionDirection = 'slide-right'; 
        this.step--;
      }
    }
  }
});