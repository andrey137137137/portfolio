<template lang="pug">
  .admin
    AdminHeader
    AdminNav
    main.section.main
      router-view(v-if="isAuth")
      h3(v-else) Вы не авторизированы
</template>

<script>
import axios from "axios";
import AdminHeader from "@backCmp/AdminHeader";
import AdminNav from "@backCmp/AdminNav";

export default {
  name: "AdminApp",
  components: {
    AdminHeader,
    AdminNav
  },
  // data() {
  //   return {
  //     isAuth: false
  //   };
  // },
  computed: {
    isAuth() {
      return !!localStorage.getItem("user-token");
    }
  },
  mounted() {
    if (!localStorage.getItem("user-token")) {
      axios.get("user/auth").then(resp => {
        localStorage.setItem("user-token", resp.data.token);
      });
    }
  }
};
</script>

<style lang="scss">
@import "@backStyles/common.scss";
@import "@backStylesCmp/header.scss";
</style>
