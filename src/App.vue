<template>
  <div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/my-page">MyPage</router-link>
    </div>
    <div><PostForm /></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
export default {
  components: {
    PostForm,
  },
};
</script>

<style></style>
