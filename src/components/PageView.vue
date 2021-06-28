<template>
  <div class="app">
    <div class="title">みんなでシェアご飯！</div>
    <div>{{ myDate }}</div>
    <div class="breakfirst">
      <h3>朝食</h3>
      <div v-for="result in results" :key="result.id">
        <div class="cooking" v-if="result.when == '朝ごはん'">
          <div class="asa">
            <div id="namae">ユーザーネーム：{{ result.name }}</div>
            <div id="gohan">料理名：{{ result.dish }}</div>
            <div id="komento">自由記入：{{ result.comments }}</div>
            <div class="asafont"><img :src="result.img" alt="" /></div>
          </div>
          <h1>
            <button @click="good1(result.like1, result.id)">👍</button>
            {{ result.like1 }}
          </h1>

          <div>
            <input type="text" placeholder="コメント" v-model="feedback1" />
            <button v-on:click="send1">送信</button>
          </div>
          <div class="feedback">
            <p v-for="comment1 in comment1s" :key="comment1">
              {{ comment1.コメント }}
            </p>
          </div>
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
          <h1>
            <button @click="good2(result.like2, result.id)">👍</button>
            {{ result.like2 }}
          </h1>
          <div>
            <input type="text" placeholder="コメント" v-model="feedback2" />
            <button v-on:click="send2">送信</button>
          </div>
          <div class="feedback">
            <p v-for="comment2 in comment2s" :key="comment2">
              {{ comment2.コメント }}
            </p>
          </div>
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
          <h1>
            <button @click="good3(result.like3, result.id)">👍</button
            >{{ result.like3 }}
          </h1>
          <div>
            <input type="text" placeholder="コメント" v-model="feedback3" />
            <button v-on:click="send3">送信</button>
          </div>
          <div class="feedback">
            <p v-for="comment3 in comment3s" :key="comment3">
              {{ comment3.コメント }}
            </p>
          </div>
        </div>
      </div>
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
      comment1s: [],
      comment2s: [],
      comment3s: [],
      feedback: "",
      count: 0,
      results: [],
      myDate: "",
    }
  },
  props: ["todayDate"],
  methods: {
    good1(number, id) {
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
        .update({ like1: number + this.count })

      //いいね:いいねのかず + this.count
      this.results.length = 0
    },
    good2(number, id) {
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
        .update({ like2: number + this.count })

      //いいね:いいねのかず + this.count
      this.results.length = 0
    },
    good3(number, id) {
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
        .update({ like3: number + this.count })

      //いいね:いいねのかず + this.count
      this.results.length = 0
    },
    send1() {
      firebase
        .firestore()
        .collection("comment1s")
        .add({
          コメント: this.feedback1,
          toWho: this.$auth.currentUser.displayName,
          day: this.myDate,
        })
    },

    send2() {
      firebase
        .firestore()
        .collection("comment2s")
        .add({
          コメント: this.feedback2,
          toWho: this.$auth.currentUser.displayName,
          day: this.myDate,
        })
    },
    send3() {
      firebase
        .firestore()
        .collection("comment3s")
        .add({
          コメント: this.feedback3,
          toWho: this.$auth.currentUser.displayName,
          day: this.myDate,
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
      .collection("comment1s")
      .where("toWho", "==", this.$auth.currentUser.displayName)
      .where("day", "==", this.myDate)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.comment1s.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
    firebase
      .firestore()
      .collection("comment2s")
      .where("toWho", "==", this.$auth.currentUser.displayName)
      .where("day", "==", this.myDate)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.comment2s.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
    firebase
      .firestore()
      .collection("comment3s")
      .where("toWho", "==", this.$auth.currentUser.displayName)
      .where("day", "==", this.myDate)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.comment3s.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
    this.comment1s.length == 0, this.isComment == false
    this.comment2s.length == 0, this.isComment == false
    this.comment3s.length == 0, this.isComment == false

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
.title {
  padding: 1rem 2rem;
  color: #fff;
  background: #094;
  -webkit-box-shadow: 5px 5px 0 #007032;
  box-shadow: 5px 5px 0 #007032;
  text-align: center;
}
.asafont {
  font-size: 2px;
}
</style>
