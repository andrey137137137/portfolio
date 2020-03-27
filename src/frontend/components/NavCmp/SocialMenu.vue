<template lang="pug">
  .socials(:class="containerClasses")
    a.icon.socials-link(
      v-for="link in links"
      :key="link.href"
      :class="iconClass(link.icon)"
      target="_blank"
      :href="link.href"
      :title="link.name")
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

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
        {
          name: "vk",
          href: "",
          icon: "vk"
        },
        {
          name: "github",
          href: "https://github.com/andrey137137137",
          icon: "github_alt"
        },
        {
          name: "skype",
          href: "skype:andrey27x777@gmail.com",
          icon: "skype"
        }
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
          "header-socials": true,
          "header-socials--left": this.config.isContent
        };
      }

      return {
        "footer_top-socials": true
      };
    }
  },
  methods: {
    iconClass: icon => {
      return { [`icon--${icon}`]: true };
    }
  }
};
</script>
