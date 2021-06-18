<template>
  <div class="SuccessLogIn">
    <h1>ログインに成功しました！</h1>
    <UserProfile />
    <div id="ReturnToPage">
      <router-link to="/LogInPage">ログインページに戻る</router-link>
    </div>
    <div>
      <router-link to="/PostForm">作った料理を投稿してみよう！</router-link>
    </div>
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
