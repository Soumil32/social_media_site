<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="links">
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/create-post">Create Post</RouterLink> |
    <RouterLink to="/create-account">Create Account</RouterLink> |
    <RouterLink to="/login">Login</RouterLink>
  </div>
  <RouterView />
</template>

<style scoped>

</style>
