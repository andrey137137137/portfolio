<template lang="pug">
  footer#footer.footer(:class="containerClasses")

    ScrollButton(v-if="config.sections > 2" :inHeader="false")

    FooterTop(v-if="config.isContent")

    ul.section.footer_bottom(:class="footerBottomClasses")
      li.container.footer_bottom-container
        p.section-desc.footer_bottom-col.footer_bottom-author &copy; {{fullName}} 
        p.section-desc.footer_bottom-col.footer_bottom-desc Мой сайт-портфолио 
        p.section-desc.footer_bottom-col.footer_bottom-date 2020
</template>

<script>
import ScrollButton from "@frontCmp/ScrollButton";
import FooterTop from "./FooterTop";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "FooterWrapper",
  components: {
    ScrollButton,
    FooterTop
  },
  computed: {
    ...mapGetters(["config", "profile"]),
    containerClasses() {
      return {
        "footer--absolute": this.config.sections > 3,
        "footer--bg": this.config.isBlog
      };
    },
    footerBottomClasses() {
      return {
        "footer_bottom--bg": this.config.isContent
      };
    },
    fullName() {
      return `${this.profile.lastName} ${this.profile.firstName}`;
    }
  }
};
</script>

<style lang="scss">
@import "@frontStylesCmp/Footer/import";
</style>
