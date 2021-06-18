<template>
  <div class="SuccessLogIn">
    <h1>ログインに成功しました！</h1>
    <UserProfile />

    <div>
      <router-link to="/LogInPage">ログインページに戻る</router-link>
    </div>
    <div class="Form">
      <div>
        <router-link to="/PostForm">作った料理を投稿してみよう！</router-link>
      </div>
      <div>
        <router-link to="/Pegeview">皆の作った料理を見てみよう！</router-link>
      </div>
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
.Form {
  position: absolute;
  right: 10px;
  top: 148px;
  border: solid;
  color: rgb(2, 3, 3);
}
</style>
