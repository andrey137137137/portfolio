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
      return !!this.getCookie("user-token");
    }
  },
  methods: {
    getCookie(name) {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    setCookie(name, value, options = {}) {
      options = {
        path: "/",
        // при необходимости добавьте другие значения по умолчанию
        ...options
      };

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      let updatedCookie =
        encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    }
  },
  mounted() {
    if (!this.getCookie("user-token")) {
      axios.get("user/auth").then(resp => {
        this.setCookie("user-token", resp.data.token);
      });
    }
  }
};
</script>

<style lang="scss">
@import "@backStyles/common.scss";
@import "@backStylesCmp/header.scss";
</style>
