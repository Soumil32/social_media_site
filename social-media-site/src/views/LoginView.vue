<template>
  <div class="login">
    <h1>Login</h1>
    <form>
      <label for="userName">User Name</label>
      <input type="text" id="userName" v-model="userName" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button @click.prevent="login">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
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
      const userName: String = this.userName;
      const password: String = this.password;
      try {
        const response = await axios.post('http://localhost:3000/login', {
          userName: userName,
          password: password
        })
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        console.log(error);
      }
      // navigate to home page
      this.$router.push({ name: 'HomeView' });
    },
  },
};
</script>

<style scoped>

</style>