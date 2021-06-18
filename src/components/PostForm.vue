<template>
  <div class="header">
    <h1>みんなの作ったご飯を共有しよう！</h1>
    <div class="app">
      <div id="namae">ユーザーネーム</div>
      <input type="text" placeholder="匿名希望" v-model="name" />
      <div>
        <select v-model="time">
          <option disabled value="sentaku">
            朝ごはん？昼ごはん？夜ごはん？"
          </option>
          <option>朝ごはん</option>
          <option>昼ごはん</option>
          <option>夜ごはん</option>
        </select>
      </div>
      <div id="komento">コメント</div>
      <textarea v-model="comments" placeholder="なんでもどうぞ！"></textarea>
      <div><button v-on:click="AfterButton">送信</button></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      result: [],
      name: "",
      time: "",
      comments: "",
    };
  },
  methods: {
    AfterButton() {
      firebase
        .firestore()
        .collection("result")
        .add({
          ニックネーム: this.name,
          いつ: this.time,
          感想: this.comments,
        });
    },
  },
  created() {
    firebase
      .firestore()
      .collection("result")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
  },
};
</script>
<style>
body {
  background-image: url("~@/assets/page.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.header {
  font-size: 40px;
  height: 100px;
  background-color: rgb(221, 142, 197);
}
.app {
  font-size: 20px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
textarea {
  resize: none;
  width: 300px;
  height: 100px;
}
</style>
