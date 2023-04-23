<template>
  <div class="create-account">
    <h1>Create Account</h1>
    <form>
      <label for="userName">User Name</label>
      <input type="text" id="userName" v-model="userName" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <!-- create a input where the access code is entered -->
      <label for="accessCode">Access Code</label>
      <input type="text" id="accessCode" v-model="accessCode" />
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
      accessCode: "",
    };
  },
  methods: {
    createAccount() {
      const userName: String = this.userName;
      const password: String = this.password;
      axios.post(`${import.meta.env.VITE_BACKEND_SERVER}create-user`, {
        userName: userName,
        password: password,
        accessCode: this.accessCode
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>