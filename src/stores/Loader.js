import { defineStore } from "pinia";

export const useLoaderStore = defineStore('loader', {
    state: () => ({ active: false }),
    actions: {
        show() {
            this.active = true;
        },
        hide() {
            this.active = false;
        }
    }
})