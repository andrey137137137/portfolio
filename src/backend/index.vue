<template lang="pug">
  .admin
    AdminHeader
    AdminNav
    main.section.main
      router-view(v-if="isAuth")
      PageWrapper(v-else :isAuth="isAuth")
</template>

<script>
import axios from "axios";
import AdminHeader from "@backCmp/AdminHeader";
import AdminNav from "@backCmp/AdminNav";
import PageWrapper from "@backCmp/PageWrapper";

export default {
  name: "AdminApp",
  components: {
    AdminHeader,
    AdminNav,
    PageWrapper
  },
  data() {
    return {
      isAuth: false
    };
  },
  created() {
    axios.get("user/auth").then(resp => {
      if (resp.data.success) this.isAuth = resp.data.success;
    });
  }
};
</script>

<style lang="scss">
@import "@backStyles/common.scss";
@import "@backStylesCmp/header.scss";
</style>
