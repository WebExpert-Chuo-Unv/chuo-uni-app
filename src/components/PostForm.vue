<template>
  <div class="app">
    <h1>みんなの作ったご飯を共有しよう！</h1>
    <div class="content">

          <h3>ユーザーネーム（匿名可）</h3>
          <input type="text" placeholder="山田太郎" v-model="name" />
          <p class="privacy">※個人情報の取り扱いに注意してください！※</p> 
        
          <h3>料理名</h3>
            <input type="text" placeholder="ハヤシライス" v-model="CookingName" />
            <p>
              <label v-show="!uploadedImage" class="input-item__label"
                >画像を選択
                <input type="file" @change="onFileChange" />
              </label>
              <div class="preview-item">
                <img
                  v-show="uploadedImage"
                  class="preview-item-file"
                  :src="uploadedImage"
                  alt=""
                />
                  <div v-show="uploadedImage" class="preview-item-btn" @click="remove">
                    <p class="preview-item-name">{{ img_name }}</p>
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
          <textarea v-model="comments" placeholder="なんでもどうぞ！" class="comment-field"></textarea>
        </div>
        <div class=back>
          <router-link to="/MyPage">戻る</router-link>
        </div>
        <div class="submit">
          <button v-on:click="AfterButton">送信</button>
        </div>
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
      date: "",
      time: "",
      CookingName: "",
      comments: "",
      uploadedImage: '',
      img_name:'',
      img:"",
    };
  },
  methods: {
    AfterButton() {
      firebase
        .firestore()
        .collection("result")
        .add({
          name: this.name,
          dates: this.date,
          when: this.time,
          dish: this.CookingName,
          comments: this.comments,
          img: this.img_name,
        })
      firebase
        .storage().ref().child(this.img.name).put(this.img);
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
      this.img_name = files[0].name;
      this.img = files[0]
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    remove() {
      this.uploadedImage = false;
    }
  },
  mounted: function(){
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
          });
        });
      });
  },
};
</script>
<style>
body {
  background-image: url("~@/assets/PostForm2.jpg");
  background-size: 100%;
  backdrop-filter: blur(5px);
}
.app{
  font-weight: bold;
  margin: 10% auto;
  text-align: center;
  width: 70%;
  height: 80vh;
  background-image: url("~@/assets/page.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.comment{
  height: 20vh;
}
.comment-field{
  width: 50%;
  height: 65%;
}
.submit{
  text-align: right;
  margin-right: 10%;
}
.preview-item-file{
    width: 30%;
    image-rendering: auto;
    border-radius: 10px;
  }
</style>