<template lang="pug">
.bg(:class='classes')
  PreloaderCmp
  ParallaxCmp
  BottomParallax(v-if='isWorks')
  slot
</template>

<script>
import { HOME, WORKS } from '@common/constants/router';
import exist from '@common/helpers/exist';
import PreloaderCmp from './PreloaderCmp';
import ParallaxCmp from './ParallaxCmp';
import BottomParallax from './BottomParallax';

import { mapActions, createNamespacedHelpers } from 'vuex';
const profileMapActions = createNamespacedHelpers('profile').mapActions;

export default {
  name: 'PageWrapper',
  components: {
    PreloaderCmp,
    ParallaxCmp,
    BottomParallax,
  },
  data() {
    return { profileIsLoaded: false };
  },
  computed: {
    classes() {
      const { name } = this.$route;
      const homeName = HOME.name;

      return {
        full_screen: name == homeName,
        main_wrap: name != homeName,
      };
    },
    isWorks() {
      return this.$route.name == WORKS;
    },
  },
  methods: {
    ...mapActions(['resetLoadedCounters', 'setPage', 'readData']),
    ...profileMapActions(['readProfile']),
    loadDbData() {
      if (!this.profileIsLoaded) {
        this.resetLoadedCounters();
        this.readProfile();
        this.profileIsLoaded = true;
      }

      if (exist('table', this.$route.meta)) {
        this.setPage({ page: this.$route.meta.table, isFront: true });
        this.readData();
      }
    },
  },
  created() {
    console.log('Component created ' + this.$options.name);
    this.loadDbData();
  },
  beforeUpdate() {
    console.log('Component beforeUpdate ' + this.$options.name);
    this.loadDbData();
  },
};
</script>

<style lang="scss">
@import '@frontStyles/common';
</style>
