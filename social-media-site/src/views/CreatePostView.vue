<template>
  <div class="flex justify-center">
    <form id="create-post" class="flex flex-col flex-grow gap-4 w-3/4 items-center">
      <label for="title" class="items-center">Title</label>
      <input type="text" id="title" class="" v-model="title" />
      <label for="content">Content</label>
      <input type="text" id="content" v-model="content" />
      <div class="bg-blue-500">
        <button id="post-btn" class="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200" @click.prevent="createPost">Create Post</button>
      </div>
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
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/create-post`, {
        title: this.title,
        content: this.content,
        headers
      }).then((response) => {
        console.log(response.data);
        this.title = "";
        this.content = "";
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped>
#post-btn {
    backdrop-filter: blur(100px);
}
</style>