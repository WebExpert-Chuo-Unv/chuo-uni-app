<template>
  <div id="app">
    <vue-feedback-reaction
      v-model="feedback"
      :labels="['最悪', 'よくない', '普通', 'いい', '最高']"
    />
  </div>
</template>

<script>
import { VueFeedbackReaction } from "vue-feedback-reaction";

export default {
  components: {
    VueFeedbackReaction,
  },
  data: () => ({
    feedback: null,
  }),
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 150px;
  margin: 0 auto;
  width: 800px;
}
</style>
