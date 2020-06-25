<template lang="pug">
  footer#footer.footer(:class="containerClasses")
    FooterTop(v-if="isContent")
    ul.section.footer_bottom(:class="footerBottomClasses")
      li.container.footer_bottom-container
        p.section-desc.footer_bottom-col.footer_bottom-author &copy; {{fullName}} 
        p.section-desc.footer_bottom-col.footer_bottom-desc Мой сайт-портфолио 
        p.section-desc.footer_bottom-col.footer_bottom-date 2020
</template>

<script>
import FooterTop from "./FooterTop";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("profile");

export default {
  name: "FooterWrapper",
  components: {
    FooterTop
  },
  computed: {
    ...mapGetters(["firstName", "lastName"]),
    isContent() {
      return this.$route.name != "home";
    },
    containerClasses() {
      const name = this.$route.name;
      return {
        "footer--absolute": name == "about",
        "footer--bg": name == "blog"
      };
    },
    footerBottomClasses() {
      return {
        "footer_bottom--bg": this.isContent
      };
    },
    fullName() {
      return `${this.lastName} ${this.firstName}`;
    }
  }
};
</script>

<style lang="scss">
@import "@frontStylesCmp/FooterWrapper/import";
</style>
