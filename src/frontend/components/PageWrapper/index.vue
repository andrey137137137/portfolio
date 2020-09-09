<template lang="pug">
.bg(:class='classes')
  PreloaderCmp(:isLoaded='isLoaded')
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
    return {
      curPage: '',
      loadedProfileCount: 0,
      isLoaded: false,
    };
  },
  computed: {
    isSamePage() {
      return this.curPage == this.$route.name;
    },
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
      if (!this.loadedProfileCount || !this.isSamePage) {
        this.resetLoadedCounters();
      }

      if (!this.loadedProfileCount) {
        this.readProfile();
        this.loadedProfileCount++;
      }

      this.loadData();
    },
  },
  created() {
    console.log('Component created ' + this.$options.name);
    this.isItFront(this.$route.meta.isFront);
    this.curPage = this.$route.name;
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
