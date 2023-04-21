<template>
  <div class="create-account">
    <h1>Create Account</h1>
    <form>
      <label for="userName">User Name</label>
      <input type="text" id="userName" v-model="userName" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button @click.prevent="createAccount">Create Account</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  name: "CreateAccount",
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    createAccount() {
      const userName: String = this.userName;
      const password: String = this.password;
      axios.post('http://localhost:3000/create-user', {
        userName: userName,
        password: password
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>