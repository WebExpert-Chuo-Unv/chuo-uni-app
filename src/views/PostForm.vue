<template>
  <div class="app">
    <h1>みんなの作ったご飯を共有しよう！</h1>
    <div>
      <input type="date" v-model="detapick" />
      <!-- <DatePick /> -->
    </div>
    <div class="content">
      <p class="privacy">※個人情報の取り扱いに注意してください！※</p>

      <h3>料理名</h3>
      <input type="text" placeholder="ハヤシライス" v-model="CookingName" />
      <p>
        <label v-show="!uploadedImage" class="input-item__label"
          >画像を選択
          <input type="file" @change="onFileChange" />
        </label>
      </p>

      <div class="preview-item">
        <img
          v-show="uploadedImage"
          class="preview-item-file"
          :src="uploadedImage"
          alt=""
        />
        <div v-show="uploadedImage" class="preview-item-btn" @click="remove">
          <p class="preview-item-name">{{ imageFileURL }}</p>
        </div>
      </div>

      <div class="option">
        <h3><p>朝ごはん？昼ごはん？夜ごはん？</p></h3>
        <select v-model="time">
          <option disabled value="sentaku">
            朝ごはん？昼ごはん？夜ごはん？"
          </option>
          <option>朝ごはん</option>
          <option>昼ごはん</option>
          <option>夜ごはん</option>
        </select>
      </div>

      <div class="comment">
        <h3><p>コメント</p></h3>
        <textarea
          v-model="comments"
          placeholder="材料や作り方など自由に書いてください！"
          class="comment-field"
        ></textarea>
      </div>
      <div class="back">
        <router-link to="/MyPage">戻る</router-link>
      </div>
      <div class="submit">
        <button v-on:click="AfterButton">送信</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
// import DatePick from "@/components/DatePick.vue";
export default {
  // components: {
  //   DatePick,
  // },
  data() {
    return {
      result: [],
      name: "",
      time: "",
      CookingName: "",
      comments: "",
      uploadedImage: "",
      imageFileURL: "",
      img: "",
      detapick: new Date(),
    }
  },
  methods: {
    AfterButton() {
      firebase
        .firestore()
        .collection("result")
        .add({
          name: this.$auth.currentUser.displayName,
          dates: this.detapick,
          when: this.time,
          dish: this.CookingName,
          comments: this.comments,
          img: this.imageFileURL,
          like: 0,
        })
      this.name = ""
      this.time = ""
      this.CookingName = ""
      this.comments = ""
      this.uploadedImage = ""
      this.imageFileURL = ""
      this.img = ""
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      this.createImage(files[0])
      this.img = files[0]
      const fileName = files[0].name
      const fileRef = firebase
        .storage()
        .ref()
        .child(fileName)
      fileRef.put(this.img).then(() => {
        fileRef.getDownloadURL().then((url) => {
          this.imageFileURL = url
        })
      })
    },
    createImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.uploadedImage = e.target.result
      }
      reader.readAsDataURL(file)
    },
    remove() {
      this.uploadedImage = false
    },
  },
  mounted: function() {
    console.log("image")
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
          })
        })
      })
  },
}
</script>
<style>
body {
  background-image: url("~@/assets/PostForm2.jpg");
  background-size: 100%;
  backdrop-filter: blur(5px);
}
.app {
  font-weight: bold;
  margin: 10% auto;
  text-align: center;
  width: 70%;
  height: 80vh;
  background-image: url("~@/assets/page.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.comment {
  height: 20vh;
}
.comment-field {
  width: 50%;
  height: 65%;
}
.submit {
  text-align: right;
  margin-right: 10%;
}
.preview-item-file {
  width: 30%;
  image-rendering: auto;
  border-radius: 10px;
}
</style>
