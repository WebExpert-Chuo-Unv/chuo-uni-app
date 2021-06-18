<template>
  <div>
    <div class="title">みんなでシェアご飯！</div>
    <div id="app">
      <div id="nav">
        <router-link to="/LogInPage">ログインページ</router-link>
      </div>
      <div class="sign-in">
        <button @click="signIn">ログイン</button>
      </div>
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
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push({ path: "/MyPage", params: { uid: user.uid } });
      }
    });
  },
};
</script>

<style>
body {
  background-image: url("~@/assets/heya.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
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
.sign-in button {
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
.sign-in button:hover {
  background-color: #2ee59d;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #42b983;
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
