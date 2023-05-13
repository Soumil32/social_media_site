<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const store = userInfoStore()
</script>

<script lang="ts">

import { userInfoStore } from "@/stores/counter";
import axios from "axios";

export default  {
  data() {
    return {
        store: userInfoStore(),
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.store.changeLoginStatus(false);
      this.$router.push('/login') // redirect to login page
    }
  },
  computed: {
    links() {
      if(this.store.isLoggedin) {
          return [
              { to: '/', text: 'Home' },
              { to: '/create-post', text: 'Create Post' },
          ]
      }
      else {
          return [
              { to: '/', text: 'Home' },
              { to: '/create-post', text: 'Create Post' },
              { to: '/create-account', text: 'Create Account' },
              { to: '/login', text: 'Login' },
          ]
      }
    }
  },
  beforeMount() {
    const token = localStorage.getItem('token');
    if(!token) {
      this.store.changeLoginStatus(false);
      return;
    }
    axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/verify-token`, {
      token: token
    }).then((response) => {
      console.log(response.data);
      this.store.changeLoginStatus(true);
    }).catch((error) => {
      console.log(error);
    });
  }
}
</script>

<template>
  <div class="bg-white mb-8">
    <div id="top-bar" class="flex justify-center items-center gap-3 ml-2 h-10">
      <RouterLink v-for="(link, i) in links" :key="i"
        :to="link.to"
        class="gradient-text hover:underline hover:from-red-500 hover:to-yellow-500">
          {{link.text}}
      </RouterLink>

      <button v-if="store.isLoggedin" @click="logout"
              class="gradient-text hover:underline hover:from-red-500 hover:to-yellow-500">Logout</button>
    </div>
  </div>
  <RouterView/>
</template>

<style scoped>

</style>
