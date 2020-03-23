<template lang="pug">
  header.section.header
    .container
      div
        a.header__link(href="/" target="_blank") Вернуться на сайт
        a.header__link(href="" @click.prevent="logout") Выйти
      h2.section__title.header__title Панель администрирования
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("auth");

export default {
  name: "AdminHeader",
  methods: {
    ...mapActions(["setAuthStatus"]),
    logout() {
      const $vm = this;

      axios.delete("user/auth").then(res => {
        if (res.data.success) {
          $vm.setAuthStatus(!res.data.success);
          return $vm.$router.push("/");
        }

        return false;
      });
    }
  }
};
</script>
