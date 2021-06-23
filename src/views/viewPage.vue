<template>
  <div>
    <div class="date"></div>

    <div class="category">
      <div class="breakfirst">
        <h3>朝食</h3>
        <div v-for="result in results" :key="result.id">
          <div class="cooking"  v-if='result.when == "朝ごはん"'>
            <p>
              {{ result.name }}
              {{ result.dish }}
              {{ result.comments }}
            </p>
          </div>
        </div>
      </div>

      <div class="lunch">
        <h3>昼食</h3>
        <div v-for="result in results" :key="result.id">
          <div class="cooking" v-if='result.when == "昼ごはん" '>
            <p>
              {{ result.name }}
              {{ result.dish }}
              {{ result.comments }}
            </p>
          </div>
        </div>
      </div>

      <div class="dinner">
        <h3>夕食</h3>
        <div v-for="result in results" :key="result.id">
          <div class="cooking" v-if='result.when == "夜ごはん" '>
            <p>
              {{ result.name }}
              {{ result.dish }}
              {{ result.comments }}
            </p>
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
    };
  },
  created() {
    console.log(this.$auth.currentUser.displayName)
    firebase
      .firestore()
      .collection("result")
      .where("name", "==", this.$auth.currentUser.displayName)
      .where("dates", "==", "2021-06-21")
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
<style></style>