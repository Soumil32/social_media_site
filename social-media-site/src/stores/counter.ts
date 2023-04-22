import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

let validToken;
axios.post('http://localhost:3000/validate-token', {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then((response) => {
    validToken = true; // if the server responds with a 200 status code, the token is valid
}).catch((error) => {
    validToken = false; // if the server responds with a 401 status code, the token is invalid
})

export const userInfoStore = defineStore('userInfo', {
  state: () => ({ _loggedIn: validToken }),
    getters: {
    isLoggedin: state => state._loggedIn,
  },
  actions: {
    changeLoginStatus() {
      this._loggedIn = !this._loggedIn
    }
  },
})
