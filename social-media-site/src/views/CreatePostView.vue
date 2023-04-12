<template>
  <div class="create-post">
    <h1>Create Post</h1>
    <form>
      <label for="title">Title</label>
      <input type="text" id="title" v-model="title" />
      <label for="content">Content</label>
      <input type="text" id="content" v-model="content" />
      <button @click.prevent="createPost">Create Post</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "CreatePostView",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    createPost() {
      const title: String = this.title;
      const content: String = this.content;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      axios.post('http://localhost:3000/create-post', {
        title: title,
        content: content,
        headers
      }).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped>

</style>