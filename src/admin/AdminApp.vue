<template lang="pug">
  .admin
    AdminHeader
    AdminNav
    main.section.main
      router-view
</template>

<script>
import AdminHeader from "@/components/Admin/AdminHeader";
import AdminNav from "@/components/Admin/AdminNav";

export default {
  name: "AdminApp",
  components: {
    AdminHeader,
    AdminNav
  },
  created() {
    console.log(this.$route);
  }
};
</script>

<style lang="scss">
@import "@/styles/app.scss";
@import "@/styles/views/Admin.scss";
</style>
