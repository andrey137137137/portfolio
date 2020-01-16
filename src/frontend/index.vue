<template lang="pug">
  transition(name="fade")
    div(:class="classes")
      //- PreloaderCmp
      ParallaxCmp
      HeaderWrapper(v-if="config.isContent")
        NavCmp
        HeaderContent
        ScrollButton
      router-view
      FooterWrapper
      MainMenu(v-if="config.isContent")
</template>

<script>
import menuChecker from "@frontend/mixins/menuChecker";
import PreloaderCmp from "@frontCmp/PageWrapper/PreloaderCmp";
import ParallaxCmp from "@frontCmp/PageWrapper/ParallaxCmp";
import HeaderWrapper from "@frontCmp/Header/HeaderWrapper";
import NavCmp from "@frontCmp/NavCmp";
import HeaderContent from "@frontCmp/Header/HeaderContent";
import ScrollButton from "@frontCmp/ScrollButton";
import FooterWrapper from "@frontCmp/FooterWrapper";
import MainMenu from "@frontCmp/NavCmp/MainMenu";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "SiteApp",
  components: {
    PreloaderCmp,
    ParallaxCmp,
    HeaderWrapper,
    NavCmp,
    HeaderContent,
    ScrollButton,
    FooterWrapper,
    MainMenu
  },
  mixins: [menuChecker],
  computed: {
    ...mapGetters(["config"]),
    classes() {
      return {
        full_screen: !this.config.isContent,
        main_wrap: this.config.isContent
      };
    }
  }
};
</script>

<style lang="scss">
@import "@frontStyles/common.scss";
@import "@frontStylesCmp/preloader.scss";
@import "@frontStylesCmp/parallax.scss";
@import "@frontStylesCmp/header.scss";
@import "@frontStylesCmp/socialMenu.scss";
@import "@frontStylesCmp/footer.scss";
</style>
