<template lang="pug">
  header.section.admin_header
    .container
      div
        a.admin_header-link(href="/" target="_blank") Вернуться на сайт
        a.admin_header-link(href="" @click.prevent="logout") Выйти
      h2.section-title.admin_header-title Панель администрирования
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("auth");

export default {
  name: "AdminHeader",
  data() {
    return {
      homePage: { name: "home" }
    };
  },
  computed: {
    ...mapGetters(["isAuth"])
  },
  methods: {
    ...mapActions(["getAuthStatus", "setAuthStatus"]),
    logout() {
      const $vm = this;

      $vm.getAuthStatus();

      if (!$vm.isAuth) {
        return $vm.$router.push($vm.homePage);
      }

      axios.delete("user/auth").then(res => {
        if (res.data.success) {
          $vm.setAuthStatus(!res.data.success);
          return $vm.$router.push($vm.homePage);
        }
      });
    }
  }
};
</script>

<style lang="scss" src="@backStylesCmp/AdminHeader.scss">
</style>
