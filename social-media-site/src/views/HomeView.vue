<template>
  <!-- main social media page. a list of the last 20 posts -->
  <div class="grid gap-4 grid-cols-1">
    <div class="w-1/2 bg-white rounded overflow-hidden shadow-lg mx-auto mb-4" v-for="(post, i) in posts" :key="i">
      <h1 class="font-bold text-xl mb-1">{{post.title}}</h1><br>
      <p class="text-gray-700 text-base mb-2">{{post.content}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    // Retrieve JWT token from browser storage
    const token = localStorage.getItem('token');

    // Define the headers to be sent in the request
    const headers = {
      // Include the authentication token in the 'Authorization' header
      Authorization: `Bearer ${token}`,
    };

    // Make request to retrieve posts with authorization header
    axios.post('http://localhost:3000/get-posts', { headers })
      .then(response => {
        this.posts = response.data.posts;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
