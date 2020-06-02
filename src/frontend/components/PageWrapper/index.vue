<template lang="pug">
  .bg(:class="classes")
    PreloaderCmp
    //- ParallaxCmp
    slot
</template>

<script>
import PreloaderCmp from "./PreloaderCmp";
import ParallaxCmp from "./ParallaxCmp";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "PageWrapper",
  components: {
    PreloaderCmp,
    ParallaxCmp
  },
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
// @import "@frontStylesCmp/Preloader/import.scss";
// @import "@frontStylesCmp/Parallax/import.scss";
// @import "@frontStylesCmp/Header/import.scss";
// @import "@frontStylesCmp/SocialMenu/import.scss";
// @import "@frontStylesCmp/Footer/import.scss";
</style>
