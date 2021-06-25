<template>
  <div class="app">
    <div class="like" v-for="article in results" :key="article.id">
      <h3>{{ article.like }}</h3>
      <button @click="good(article.like, article.id)">👍</button>
    </div>
    <div>
      <input type="text" placeholder="コメント" v-model="feedback" size="30*60" />
    </div>
    <div class="send-button">
      <button  v-on:click="send">送信</button>
    </div>
    <div class="comment">
      <p v-for="comment in comments" :key="comment">
        {{ comment.コメント }}
      </p>
    </div>
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
      myUrl:[],
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
        .update({ like: number + this.count });

      //いいね:いいねのかず + this.count
      this.results.length = 0;
    },

    send() {
      firebase
        .firestore()
        .collection("comments")
        .add({
          コメント: this.feedback, //
          //toWho:uid
        });
      this.comments.length = 0;
      firebase
        .firestore()
        .collection("comments")
        .add({
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
      .onSnapshot((snapshot) => {
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
      .where("name", "==", this.$auth.currentUser.displayName)
      .where("dates", "==", this.myDate)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
    
  },
};
</script>

<style>
.app{
  background-color: greenyellow;
  width: 30vh;
  height: 30vh;
}
.comment-form{
  size: 500*500;
}
</style>
