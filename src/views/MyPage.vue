<template>
  <div>
    <div class="title">みんなでシェアご飯！</div>
    <div class="SuccessLogIn">
      <h1>ログインに成功しました！</h1>
      <UserProfile />
      <div class="Form">
        <div>
          <router-link to="/PostForm">作った料理を投稿してみよう！</router-link>
        </div>
        <div>
          <router-link to="/Pegeview">皆の作った料理を見てみよう！</router-link>
        </div>
        <div class="LogOut"><button @click="signOut">ログアウト</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import UserProfile from "@/components/UserProfile.vue";
export default {
  components: {
    UserProfile,
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/LogInPage");
    },
  },
};
</script>
<style>
.Form {
  position: absolute;
  left: 10px;
  top: 450px;
  border: solid;
  color: rgb(2, 3, 3);
}
.LogOut button {
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  font-size: 30px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.LogOut button:hover {
  background-color: #fc0800;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
}
body {
  background-image: url("~@/assets/aa.jpeg");
  background-size: 100%;
  backdrop-filter: blur(5px);
}
.title {
  color: rgb(112, 12, 226);
  font-size: 2em;
  font-weight: 100;
  margin: 2em 0;
  position: relative;
  padding: 0.5em 1.5em;
  border-top: solid 2px black;
  border-bottom: solid 2px black;
}
.SuccessLogIn {
  color: greenyellow;
  font-size: 40px;
  text-align: center;
}
</style>
