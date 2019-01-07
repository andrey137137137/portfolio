<template lang="pug">
  .menu(:id="id" :class="containerClasses")
    a.menu__link(
      v-for="link in links"
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
      default: false
    }
  },
  data() {
    return {
      links: [
        { name: "home", isContent: false, href: "/" },
        { name: "works", isContent: true, href: "/works" },
        { name: "about", isContent: true, href: "/about" },
        { name: "blog", isContent: true, href: "/blog" }
      ]
    };
  },
  computed: {
    ...mapGetters(["config"]),
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
        return {};
      }

      return {
        section__title: this.config.isContent,
        "section__title-large": this.config.isContent,
        "section__title-underlined": this.config.isContent,
        btn: !this.config.isContent
      };
    }
  }
};
</script>
