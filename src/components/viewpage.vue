<template>
  <div>
    <div class="category">
      <div class="breakfirst">
        <h3>朝食</h3>
        <div v-for="result in results" :key="result.id">
          <div class="cooking"  v-if='result.when == "朝ごはん"'>
            <table>
              <tr>{{ result.name }}</tr>
              <tr>{{ result.dish }}</tr>
              <tr>{{ result.comments }}</tr>
            </table>
            <img src="" alt="image">
          </div>
          
        </div>
      </div>

      <div class="lunch">
        <h3>昼食</h3>
        <div v-for="result in results" :key="result.id">
          <div class="cooking" v-if='result.when == "昼ごはん" '>
            <table>
              <tr>{{ result.name }}</tr>
              <tr>{{ result.dish }}</tr>
              <tr>{{ result.comments }}</tr>
            </table>
            <img src="" alt="image">
          </div>
          
        </div>
      </div>

      <div class="dinner">
        <h3>夕食</h3>
        <div v-for="result in results" :key="result.id">
          <div class="cooking" v-if='result.when == "夜ごはん" '>
            <table>
              <tr>{{ result.name }}</tr>
              <tr>{{ result.dish }}</tr>
              <tr>{{ result.comments }}</tr>
            </table>
            <img src="" alt="image">
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {

  data() {
    return {
      results: [],
      myDate: ""
    };
  },
  created() {
    firebase
      .firestore()
      .collection("result")
      .where("name", "==", this.$auth.currentUser.displayName)
      .where("dates", "==", this.myDate)
      .get()
      .then((snapshot) => {
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
.breakfirst{
  width: 80%;
  margin: auto;
}
.lunch{
  width: 80%;
  margin: auto;
}
.dinner{
  width: 80%;
  margin: auto;
}
.cooking{
  background-image: url(~@/assets/aa.jpeg);
  background-repeat: no-repeat;
  width: 100vh;
  height: 30vh;
}
table tr{
  margin: 5%;
  font-weight: bolder;
  color: rgb(0, 0, 0);
}
</style>