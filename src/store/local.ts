import { defineStore } from "pinia";

export const useLocalStore = defineStore('local', {
    state: () => {
        return {
            cur_pid: 0
        }
    }
})