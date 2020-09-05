<template lang="pug">
.bg(:class='classes')
  PreloaderCmp
  ParallaxCmp
  slot
</template>

<script>
import { HOME } from '@common/constants/router';
import loadDataMixin from '@common/mixins/loadDataMixin';
import PreloaderCmp from './PreloaderCmp';
import ParallaxCmp from './ParallaxCmp';

import { mapActions, createNamespacedHelpers } from 'vuex';
const profileMapActions = createNamespacedHelpers('profile').mapActions;

export default {
  name: 'PageWrapper',
  components: {
    PreloaderCmp,
    ParallaxCmp,
  },
  mixins: [loadDataMixin],
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
  },
  methods: {
    ...mapActions(['resetLoadedCounters']),
    ...profileMapActions(['readProfile']),
    loadProfileAndPageData() {
      if (!this.profileIsLoaded) {
        this.isItFront(this.$route.meta.isFront);
        this.resetLoadedCounters();
        this.readProfile();
        this.profileIsLoaded = true;
      }

      this.loadData();
    },
  },
  created() {
    console.log('Component created ' + this.$options.name);
    this.loadProfileAndPageData();
  },
  beforeUpdate() {
    console.log('Component beforeUpdate ' + this.$options.name);
    this.loadProfileAndPageData();
  },
};
</script>

<style lang="scss">
@import '@frontStyles/common';
</style>
