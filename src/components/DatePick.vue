<template>
  <div id="app" class="container">
    <h3>Datepicker</h3>
    <form>
      <div class="col-3 mx-auto" style="width: 250px;">
        <dater
          :format="DatePickerFormat"
          :bootstrap-styling="true"
          :language="ja"
          placeholder="日付を選択してください"
        ></date>
      </div>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ja } from "vuejs-datepicker/dist/locale";

export default {
  name: "app",
  data() {
    return {
      DatePickerFormat: "yyyy-MM-dd",

      ja: ja,
    };
  },
  components: {
    Datepicker,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  text-align: center;
  color: #2c3e50;
  margin-top: 260px;
  width: 50%;
}
</style>
