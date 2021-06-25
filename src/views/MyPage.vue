<template>
  <div>
    <div class="title">みんなでシェアご飯！</div>
    <div class="SuccessLogIn">
      <h1>ログインに成功しました！</h1>
      <UserProfile />
      <div class="Form">
        <router-link class="toukouForm" to="/PostForm"
          ><span>01</span>
          作った料理を投稿してみよう！
        </router-link>
        <router-link class="viewForm" to="/PageView"
          ><span>02</span> 皆の作った料理を見てみよう！</router-link
        >
        <router-link class="calendarForm" to="/Calendar"
          ><span>03</span>カレンダーはこちら</router-link
        >
      </div>
      <div class="LogOut"><button @click="signOut">ログアウト</button></div>
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
  left: 250px;
  top: 650px;
  width: 800px;
  border: solid;
  text-align: left;
  color: rgb(0, 0, 0, 0);
}
.LogOut button {
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  font-size: 30px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  background-color: orange;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  position: absolute;
  right: 10px;
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
  padding: 1rem 2rem;
  color: #fff;
  background: #094;
  -webkit-box-shadow: 5px 5px 0 #007032;
  box-shadow: 5px 5px 0 #007032;
  text-align: center;
}
.SuccessLogIn {
  color: greenyellow;
  font-size: 40px;
  text-align: center;
}
.toukouForm {
  position: relative;
  padding-left: 4em;
}
.toukouForm span {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 2rem;
  color: #e3f5d8;
  background: #22ac38;
}
.toukouForm span::after {
  position: absolute;
  top: calc(50% - 7px);
  right: -11px;
  width: 0;
  height: 0;
  content: "";
  border-width: 7px 0 7px 12px;
  border-style: solid;
  border-color: transparent transparent transparent #22ac38;
}
.viewForm {
  position: relative;
  padding-left: 4em;
}
.viewForm span {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 2rem;
  color: #e3f5d8;
  background: #22ac38;
}
.viewForm span::after {
  position: absolute;
  top: calc(50% - 7px);
  right: -11px;
  width: 0;
  height: 0;
  content: "";
  border-width: 7px 0 7px 12px;
  border-style: solid;
  border-color: transparent transparent transparent #22ac38;
}
.calendarForm {
  position: relative;
  padding-left: 4em;
}
.calendarForm span {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 2rem;
  color: #e3f5d8;
  background: #22ac38;
}
.calendarForm span::after {
  position: absolute;
  top: calc(50% - 7px);
  right: -11px;
  width: 0;
  height: 0;
  content: "";
  border-width: 7px 0 7px 12px;
  border-style: solid;
  border-color: transparent transparent transparent #22ac38;
}
</style>
