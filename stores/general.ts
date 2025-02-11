
import { defineStore } from 'pinia';

export const useGeneralStore = defineStore('general', {
    state: () => ({
     test: 1 as number
    }),
    getters: {
    },
    actions: {
    addNum(){
        this.test++;
    }
    },
});