<template>
  <!-- main social media page. a list of the last 20 posts -->
  <div class="flex flex-col min-h-screen flex-grow flex-nowrap justify-start">
    <div class="lg:w-1/4 sm:w-1 bg-white rounded overflow-hidden shadow-lg mx-auto mb-4 pl-2 pr-1" v-for="(post, i) in posts.slice(0, 10)" :key="i">
      <div class="font-bold text-xl mb-2">{{post.title}} <!--suppress TypeScriptUnresolvedReference -->
        <div class="text-gray-400 text-sm">{{post.userName}}</div></div>
      <p class="text-gray-700 text-base mb-2 ">{{post.content}}</p>
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
      console.log(import.meta.env.VITE_BACKEND_SERVER);
    axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/get-posts`, { headers })
      .then(response => {
        this.posts = response.data.posts;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
