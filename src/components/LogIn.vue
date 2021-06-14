<template>
  <div>
    <div class="title">みんなでシェアご飯！</div>
    <div id="app">
      <div id="nav">
        <router-link to="/BeforeSignIn">ログインページ</router-link>
      </div>
      <div class="sign-in">
        <span @click="signIn">ログイン</span>
        <span @click="signOut">ログアウト</span>
      </div>
      <router-view />
      <router-link to="/AfterSignIn"
        >ログインしたらここをクリック！</router-link
      >
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/BeforeSignIn");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  line-height: 3em;
  font-size: 2em;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 1rem;
}
#nav a:hover {
  color: #2c3e502b;
}
.sign-in span {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 1rem;
}
.sign-in span:hover {
  color: #2c3e502b;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.title {
  color: chartreuse;
  font-size: 2em;
  margin: 2em 0;
  position: relative;
  padding: 0.5em 1.5em;
  border-top: solid 2px black;
  border-bottom: solid 2px black;
}
.box17:before,
.box17:after {
  content: "";
  position: absolute;
  top: -10px;
  width: 2px;
  height: -webkit-calc(100% + 20px);
  height: calc(100% + 20px);
  background-color: black;
}
.box17:before {
  left: 10px;
}
.box17:after {
  right: 10px;
}
.box17 p {
  margin: 0;
  padding: 0;
}
</style>
