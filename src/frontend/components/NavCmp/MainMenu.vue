<template lang="pug">
  .menu(:id="id" :class="containerClasses")
    router-link.menu-link(
      v-for="link in links"
      :key="link.path"
      :class="linkClasses"
      :to="link.path"
    ) {{link.name}}
</template>

<script>
import exist from "@common/helpers/exist.js";

export default {
  name: "MainMenu",
  props: {
    inHeader: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isContent() {
      return this.$route.name != "home";
    },
    restPages() {
      return this.getRoutes(
        item => item.path == "/" && exist("children", item)
      )[0].children;
    },
    links() {
      const data = this.restPages;
      // const data = [
      //   { name: "Мои работы", path: "/works" },
      //   { name: "Обо мне", path: "/about" },
      //   { name: "Блог", path: "/blog" }
      // ];

      if (this.inHeader) return data;
      return [...data, { name: "Авторизация", path: "/" }];
    },
    id() {
      return this.inHeader && this.isContent ? "main_menu" : "";
    },
    containerClasses() {
      if (!this.inHeader) return { "footer_top-menu": true };
      return {
        "header-menu": true,
        "header-menu--absolute": this.isContent,
        "header-menu--float": !this.isContent
      };
    },
    linkClasses() {
      if (!this.inHeader) return {};
      return {
        "section-title": this.isContent,
        "section-title--large": this.isContent,
        "section-title--underlined": this.isContent,
        btn: !this.isContent
      };
    }
  },
  methods: {
    getRoutes(cb) {
      return this.$router.options.routes.filter(cb);
    }
  }
};
</script>
