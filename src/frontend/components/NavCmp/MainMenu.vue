<template lang="pug">
  .menu(:id="id" :class="containerClasses")
    a.menu__link(
      v-for="link in activeLinks"
      :key="link.href"
      :class="linkClasses"
      :href="link.href"
    ) {{link.name}}
</template>

<script>
import { mapGetters } from "vuex";

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
          header__menu: true,
          "header__menu-absolute": this.config.isContent,
          "header__menu-float": !this.config.isContent
        };
      }

      return {
        footer_top__menu: true
      };
    },
    linkClasses() {
      if (this.inHeader) {
        return {
          section__title: this.config.isContent,
          "section__title-large": this.config.isContent,
          "section__title-underlined": this.config.isContent,
          btn: !this.config.isContent
        };
      }

      return {};
    }
  }
};
</script>
