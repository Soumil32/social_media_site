<template>
  {{ userProfile }}
</template>

<script>
import axios from "axios";
export default {
  name: "ProfileView",
  data() {
    return {
      userProfile: {},
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }
    axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/get-user-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.userProfile = response.data.profile;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>

<style scoped>

</style>