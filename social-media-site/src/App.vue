<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-white">
    <div id="top-bar" class="flex justify-end items-center gap-1 mr-2 h-10">
      <RouterLink class="gradient-text" to="/">Home</RouterLink> |
      <RouterLink to="/create-post" class="text-black hover:gradient-text transition-all">Create Post</RouterLink> |
      <RouterLink to="/create-account" class="gradient-text">Create Account</RouterLink> |
      <RouterLink to="/login" class="gradient-text bg-gradient-to-l">Login</RouterLink>
    </div>
  </div>
  <RouterView/>
</template>

<style scoped>

</style>
