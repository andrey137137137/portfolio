<template lang="pug">
  .menu(:id="id" :class="containerClasses")
    router-link.menu-link(
      v-for="link in activeLinks"
      :key="link.href"
      :class="linkClasses"
      :to="link.href"
    ) {{link.name}}
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "MainMenu",
  props: {
    inHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      links: [
        { name: "Главная", isContent: false, href: "/" },
        { name: "Мои работы", isContent: true, href: "/works" },
        { name: "Обо мне", isContent: true, href: "/about" },
        { name: "Блог", isContent: true, href: "/blog" }
      ]
    };
  },
  computed: {
    ...mapGetters(["config"]),
    activeLinks() {
      return this.links.filter(item => item.isContent);
    },
    id() {
      return this.inHeader && this.config.isContent ? "main_menu" : "";
    },
    containerClasses() {
      if (this.inHeader) {
        return {
          "header-menu": true,
          "header-menu--absolute": this.config.isContent,
          "header-menu--float": !this.config.isContent
        };
      }

      return {
        "footer_top-menu": true
      };
    },
    linkClasses() {
      if (this.inHeader) {
        return {
          "section-title": this.config.isContent,
          "section-title--large": this.config.isContent,
          "section-title--underlined": this.config.isContent,
          btn: !this.config.isContent
        };
      }

      return {};
    }
  }
};
</script>
