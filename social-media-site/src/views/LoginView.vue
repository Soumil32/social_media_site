<template>
  <div class="login">
    <h1>Login</h1>
    <form>
      <label for="userName">User Name</label>
      <input type="text" id="userName" v-model="userName" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button @click.prevent="login" type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200
      hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-2 focus:outline-none
      focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-1.5 text-center mr-2 mb-2">
        Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { userInfoStore} from "@/stores/counter";

export default {
  name: "LoginView",
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const store = userInfoStore();
      const userName: String = this.userName;
      const password: String = this.password;
      axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/login`, {
        userName: userName,
        password: password
      }).then((response) => {
        console.log(response.data);
        this.userName = "";
        this.password = "";
        localStorage.setItem('token', response.data.token);
        store.changeLoginStatus(true);
        this.$router.push('/') // redirect to home page
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped>

</style>