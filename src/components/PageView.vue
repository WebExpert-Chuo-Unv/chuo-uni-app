<template>
  <div class="app">
    <div>今日は {{ myDate }}</div>
    <div class="iine" v-for="article in results" :key="article.id">
      <h1>{{ article.like }}</h1>
      <button @click="good(article.like, article.id)">👍</button>
    </div>
    <input type="text" placeholder="コメント" v-model="feedback" />
    <button v-on:click="send">送信</button>
    <div>
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
      myDate: "",
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
    if (this.todayDate.day < 10) {
      this.myDate = this.todayDate.month + "-0" + this.todayDate.day;
    } else {
      this.myDate = this.todayDate.month + "-" + this.todayDate.day;
    }
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
      for(let i=0; i <3 ;i++){
        firebase.storage().ref().child(this.results[i].img).getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element:
        //var img = document.getElementById('myimg');
        //img.src = url;
        this.myUrl.push(url)
      }).catch(function(error) {
        // Handle any errors
        alert(error)
      });
    }
  },
};
</script>

<style></style>
