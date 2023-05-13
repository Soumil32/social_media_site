import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const userInfoStore = defineStore('userInfo', {
  state: () => ({ _loggedIn: false }),
    getters: {
    isLoggedin: state => state._loggedIn,
  },
  actions: {
    changeLoginStatus(status: boolean) {
      this._loggedIn = status
    }
  },
})
