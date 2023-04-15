<template>
  <!-- main social media page. a list of the last 20 posts -->
  <div class="posts">
    <div class="post" v-for="(post,_,i) in posts" :key="i">
      <h1>{{post.title}}</h1>
      <p>{{post.content}}</p>
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
