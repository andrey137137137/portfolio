<template lang="pug">
  .admin
    AdminHeader
    AdminNav
    main.section.main
      router-view
</template>

<script>
import AdminHeader from "@backCmp/AdminHeader";
import AdminNav from "@backCmp/AdminNav";

export default {
  name: "AdminApp",
  components: {
    AdminHeader,
    AdminNav
  }
};
</script>

<style lang="scss">
@import "@backStyles/common.scss";
@import "@backStylesCmp/header.scss";
</style>
