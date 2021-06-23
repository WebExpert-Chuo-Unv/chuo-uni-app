<template>
  <div>
    <div class="date">
      
    </div>
    <div class="category">

      <div class="breakfirst">
        <h3>朝食</h3>
        <div class="cooking">
          <p v-for="result in results" :key="result.id">
            {{ result.name }}
            {{ result.CookingName }}
            {{ result.comments }}
          </p>
        </div>
      </div>

      <div class="lunch">
        <h3>昼食</h3>
        <div class="cooking">
          <p v-for="result in results" :key="result.id">
            {{ result.name }}
            {{ result.CookingName }}
            {{ result.comments }}
          </p>
        </div>
      </div>

      <div class="dinner">
        <h3>夕食</h3>
        <div class="cooking">
          <p v-for="result in results" :key="result.id">
            {{ result.name }}
            {{ result.CookingName }}
            {{ result.comments }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      results: [

      ]
    };
  },
  created() {
    firebase
      .firestore()
      .collection("results")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.results.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
  }
};

</script>
<style>

</style>