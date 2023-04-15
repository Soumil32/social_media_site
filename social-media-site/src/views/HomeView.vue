<template>
  <!-- main social media page. a list of the last 20 posts -->
  <div class="flex gap-4 flex-col content-center">
    <div class="w-1/2 bg-white rounded overflow-hidden shadow-lg mx-auto mb-4 pl-2 pr-1" v-for="(post, i) in posts" :key="i">
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
