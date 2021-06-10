<template>
  <div class="app">
    <h1>みんなの作ったご飯を共有しよう！</h1>

    <div id="namae">ユーザーネーム</div>
    <input type="text" placeholder="匿名希望" v-model="name" />
    <div id="komento">コメント</div>
    <input type="text" placeholder="なんでもどうぞ！" v-model="comments" />
    <div><button v-on:click="AfterButton">送信</button></div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      result: [],
      name: "",
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
          曲名: this.comments,
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
