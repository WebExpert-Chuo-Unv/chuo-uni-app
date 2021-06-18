<template>
  <div class="SuccessLogIn">
    <h1>ログインに成功しました！</h1>
    <UserProfile />
  </div>
</template>

<script>
import UserProfile from "@/components/UserProfile.vue";
export default {
  components: {
    UserProfile,
  },
};
</script>
<style>
.SuccessLogIn {
  color: greenyellow;
}
</style>
