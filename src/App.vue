<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>
      <Image />
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"
import Image from "@/components/Image.vue"


export default {
  name: "App",
  components: {
    HelloWorld,
    Image
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
