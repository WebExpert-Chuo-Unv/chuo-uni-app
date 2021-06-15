<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ImagePost />
  </div>
</template>

<script>
import ImagePost from "./components/ImagePost.vue"

export default {
  name: "App",
  components: {
    ImagePost,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: red;
  margin-top: 60px;
}
</style>
