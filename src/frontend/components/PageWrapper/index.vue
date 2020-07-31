<template lang="pug">
.bg(:class='classes')
  //- PreloaderCmp
  ParallaxCmp
  WorksParallax(v-if='isWorks')
  slot
</template>

<script>
import PreloaderCmp from './PreloaderCmp';
import ParallaxCmp from './ParallaxCmp';
import WorksParallax from './WorksParallax';

export default {
  name: 'PageWrapper',
  components: {
    PreloaderCmp,
    ParallaxCmp,
    WorksParallax,
  },
  computed: {
    classes() {
      const name = this.$route.name;
      return {
        full_screen: name == 'home',
        main_wrap: name != 'home',
      };
    },
    isWorks() {
      return this.$route.name == 'works';
    },
  },
};
</script>

<style lang="scss">
@import '@frontStyles/common.scss';
</style>
