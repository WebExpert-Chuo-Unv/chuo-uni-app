<template>
  <div>
    <LogIn v-if="!user" />
    <router-view v-else />
  </div>
</template>

<script>
import LogIn from "@/components/LogIn.vue"
export default {
  components: {
    LogIn,
  },
  computed: {
    user() {
      return this.$auth.currentUser.uid
    },
  },
}
</script>
