<template lang="pug">
  .socials(:class="containerClasses")
    a.icon.socials__link(
      v-for="link in links"
      :key="link.href"
      :class="iconClass(link.icon)"
      target="_blank"
      :href="link.href"
      :title="link.name")
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SocialMenu",
  props: {
    inHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      links: [
        { name: "index", href: "/" },
        { name: "works", href: "/works" },
        { name: "about", href: "/about" },
        { name: "blog", href: "/blog" }
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
          header__socials: true,
          "header__socials-left": this.config.isContent
        };
      }

      return {
        footer_top__socials: true
      };
    }
  },
  methods: {
    iconClass: icon => {
      return { [`icon-${icon}`]: true };
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/SocialMenu.scss" scoped>
</style>
