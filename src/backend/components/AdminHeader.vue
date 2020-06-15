<template lang="pug">
  header.section.admin_header
    .container
      div
        a.admin_header-link(:href="homeLink" target="_blank") Вернуться на сайт
        a.admin_header-link(href="" @click.prevent="logout") Выйти
      h2.section-title.admin_header-title Панель администрирования
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { HOME } from "@common/constants/router.js";

export default {
  name: "AdminHeader",
  data() {
    return {
      homeLink: HOME.path
    };
  },
  computed: {
    ...mapGetters(["isAuth"])
  },
  methods: {
    ...mapActions(["setAuthStatus"]),
    logout() {
      if (!this.isAuth) return this.$router.push(HOME);

      const $vm = this;

      axios.delete("user/auth").then(res => {
        if (res.data.success) {
          $vm.setAuthStatus(!res.data.success);
          return $vm.$router.push(HOME);
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@backStylesCmp/AdminHeader";
</style>
