<template>
  <div class="app">
    <div class="iine" v-for="article in results" :key="article.id">
      <h1>{{ article.いいね }}</h1>
      <button @click="good(article.いいね, article.id)">👍</button>
    </div>
    <input type="text" placeholder="コメント" v-model="feedback" />
    <button v-on:click="send">送信</button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      isComment: true,
      comments: [],
      feedback: "",
      count: 0,
      results: [],
    };
  },
  props: ["todayDate"],
  methods: {
    good(number, id) {
      if (this.count <= 0) {
        this.count = 1;
      } else {
        this.count = -1;
      }
      /// update
      /// 引数(いいねの数、いいねの対象のid)
      firebase
        .firestore()
        .collection("result")
        .doc(id)
        .update({ いいね: number + this.count });

      //いいね:いいねのかず + this.count
      this.results.length = 0;
    },

    send() {
      firebase.firestore().collection("comments").add({
        コメント: this.feedback, //
        //toWho:uid
      });
    },
  },
  created() {
    firebase
      .firestore()
      .collection("comments")
      //.where("toWho", "==", "yamada")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.comments.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
    //if this.comment.length == 0     this.isComment == false;
    firebase
      .firestore()
      .collection("result")
      .where("ニックネーム", "==", "yamada")
      .where("ひづけ", "==", "2021-6-21")
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
    if (this.today < 10) {
      this.myDate = this.todayDate.month + "-0" + this.today.day;
    } else {
      this.myDate = this.todayDate.month + "-" + this.today.day;
    }
  },
};
</script>

<style></style>
