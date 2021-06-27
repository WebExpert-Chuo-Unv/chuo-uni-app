<template>
  <div class="app">
    <div>今日は {{ myDate }}</div>
    <div class="breakfirst">
      <h3>朝食</h3>
      <div v-for="result in results" :key="result.id">
        <div class="cooking" v-if="result.when == '朝ごはん'">
          <div class="asa">
            <div id="namae">ユーザーネーム：{{ result.name }}</div>
            <div id="gohan">料理名：{{ result.dish }}</div>
            <div id="komento">自由記入：{{ result.comments }}</div>
            <img :src="result.img" alt="" />
          </div>
          <h1>{{ result.like }}</h1>
          <button @click="good(result.like, result.id)">👍</button>
          <img :src="result.img" alt="" />
        </div>
      </div>
    </div>

    <div class="lunch">
      <h3>昼食</h3>
      <div v-for="result in results" :key="result.id">
        <div class="cooking" v-if="result.when == '昼ごはん'">
          <div>
            <div id="namae">ユーザーネーム：{{ result.name }}</div>
            <div id="gohan">料理名：{{ result.dish }}</div>
            <div id="komento">自由記入：{{ result.comments }}</div>
          </div>
          <h1>{{ result.like }}</h1>
          <button @click="good(result.like, result.id)">👍</button>
        </div>
      </div>
    </div>

    <div class="dinner">
      <h3>夕食</h3>
      <div v-for="result in results" :key="result.id">
        <div class="cooking" v-if="result.when == '夜ごはん'">
          <div class="yoru">
            <div id="namae">ユーザーネーム:{{ result.name }}</div>
            <div id="gohan">料理名：{{ result.dish }}</div>
            <div id="komento">自由記入：{{ result.comments }}</div>
          </div>
          <h1>{{ result.like }}</h1>
          <button @click="good(result.like, result.id)">👍</button>
        </div>
      </div>
    </div>
    <input type="text" placeholder="コメント" v-model="feedback" />
    <button v-on:click="send">送信</button>
    <div class="feedback">
      <p v-for="comment in comments" :key="comment">
        {{ comment.コメント }}
      </p>
    </div>
    <router-link to="/Calendar">日にち選択に戻る</router-link>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      isComment: true,
      comments: [],
      feedback: "",
      count: 0,
      results: [],
      myDate: "",
    }
  },
  props: ["todayDate"],
  methods: {
    good(number, id) {
      if (this.count <= 0) {
        this.count = 1
      } else {
        this.count = -1
      }
      /// update
      /// 引数(いいねの数、いいねの対象のid)
      firebase
        .firestore()
        .collection("result")
        .doc(id)
        .update({ like: number + this.count })

      //いいね:いいねのかず + this.count
      this.results.length = 0
    },

    send() {
      firebase
        .firestore()
        .collection("comments")
        .add({
          コメント: this.feedback, //
          //toWho:uid
        })
      this.comments.length = 0
      firebase
        .firestore()
        .collection("comments")
        .add({
          コメント: this.feedback,
          toWho: this.$auth.currentUser.displayName,
        })
    },
  },
  created() {
    if (this.todayDate.day < 10) {
      this.myDate = this.todayDate.month + "-0" + this.todayDate.day
    } else {
      this.myDate = this.todayDate.month + "-" + this.todayDate.day
    }
  },
  mounted() {
    firebase
      .firestore()
      .collection("comments")
      .where("toWho", "==", this.$auth.currentUser.displayName)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.comments.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
    this.comments.length == 0, this.isComment == false
    console.log(this.myDate)
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
          })
        })
      })
  },
}
</script>

<style>
body {
  text-align: center;
}
.feedback {
  height: 80px;
  width: 20em;
  overflow: auto;
  margin: 0 auto;

  padding: 1em 1.5em;

  background-color: #fff0f5; /*背景色*/
  border: 1px solid #9370db; /*線*/
  color: #000000; /*文字色*/
  border-radius: 10px; /*角の丸み*/
}
.yoru {
  height: auto;
  width: 20em;

  margin: 0 auto;

  padding: 1em 1.5em;

  background-color: #fff0f5; /*背景色*/
  border: 1px solid #9370db; /*線*/
  color: #000000; /*文字色*/
  border-radius: 10px; /*角の丸み*/
}
</style>
