<template>
  <div>今日は {{ myDate }}</div>
</template>
<script>
export default {
  data() {
    return {
      myDate: "",
    };
  },
  props: ["todayDate"],
  created() {
    if (this.today < 10) {
      this.myDate = this.todayDate.month + "-0" + this.todayDate.day;
    } else {
      this.myDate = this.todayDate.month + "-" + this.todayDate.day;
    }
  },
};
</script>
