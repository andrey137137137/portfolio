<template lang="pug">
  router-view
</template>

<script>
export default {
  name: "App",
  computed: {
    isAdminPath() {
      console.log(this.$route.path);
      return this.$route.path === "admin";
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/app.scss";
</style>
