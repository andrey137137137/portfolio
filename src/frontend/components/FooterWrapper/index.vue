<template lang="pug">
  footer#footer.footer(:class="containerClasses")

    ScrollButton(v-if="config.sections > 2" :inHeader="false")

    FooterTop(v-if="config.isContent")

    ul.section.footer_bottom(:class="footerBottomClasses")
      li.container.footer_bottom-container
        p.section-desc.footer_bottom-col.footer_bottom-author &copy; Банников Андрей
        p.section-desc.footer_bottom-col.footer_bottom-desc Создаю с любовью в LoftSchool
        p.section-desc.footer_bottom-col.footer_bottom-date 2018
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
    ...mapGetters(["config"]),
    containerClasses() {
      return {
        "footer--absolute": !this.config.isContent || this.config.sections > 2,
        "footer--bg": this.config.isBlog
      };
    },
    footerBottomClasses() {
      return {
        "footer_bottom--bg": this.config.isContent
      };
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/Footer/import.scss"></style>
