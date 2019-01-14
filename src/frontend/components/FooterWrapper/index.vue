<template lang="pug">
  footer#footer.footer(:class="containerClasses")

    ScrollButton(v-if="config.sections > 2" :inHeader="false")

    FooterTop(v-if="config.isContent")

    ul.section.footer_bottom(:class="footerBottomClasses")
      li.container.footer_bottom__container
        p.section__desc.footer_bottom__col.footer_bottom__author &copy; Банников Андрей
        p.section__desc.footer_bottom__col.footer_bottom__desc Создаю с любовью в LoftSchool
        p.section__desc.footer_bottom__col.footer_bottom__date 2018
</template>

<script>
import ScrollButton from "@frontCmp/ScrollButton";
import FooterTop from "./FooterTop";

import { mapGetters } from "vuex";

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
        "footer-absolute": !this.config.isContent || this.config.sections,
        "footer-bg": this.config.isBlog
      };
    },
    footerBottomClasses() {
      return {
        "footer_bottom-bg": this.config.isContent
      };
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/FooterWrapper.scss">
</style>
