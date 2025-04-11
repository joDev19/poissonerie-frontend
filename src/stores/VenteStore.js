import { defineStore } from "pinia";

export const useVenteStore = defineStore('vente', {
    state: () => ({ step: 1, isUpdate: false }),
    actions: {
        increment() {
            this.step++;
        },
        decrement() {
            this.step--;
        }
    }
})