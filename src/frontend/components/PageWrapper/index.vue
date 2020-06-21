<template lang="pug">
  .bg(:class="classes")
    //- PreloaderCmp
    ParallaxCmp
    slot
</template>

<script>
import PreloaderCmp from "./PreloaderCmp";
import ParallaxCmp from "./ParallaxCmp";

export default {
  name: "PageWrapper",
  components: {
    PreloaderCmp,
    ParallaxCmp
  },
  computed: {
    classes() {
      const name = this.$route.name;
      return {
        full_screen: name == "home",
        main_wrap: name != "home"
      };
    }
  }
};
</script>

<style lang="scss">
@import "@frontStyles/common.scss";
</style>
