<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<script lang="ts">
export default  {
  data() {
    return {
      links: [
        { to: '/', text: 'Home' },
        { to: '/create-post', text: 'Create Post' },
        { to: '/create-account', text: 'Create Account' },
        { to: '/login', text: 'Login' },
      ]
    }
  },
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
    </div>
  </div>
  <RouterView/>
</template>

<style scoped>

</style>
