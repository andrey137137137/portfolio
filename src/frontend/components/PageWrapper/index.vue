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
    return {
      curPage: '',
      changedPageCount: 0,
      loadedProfileCount: 0,
    };
  },
  computed: {
    isSamePage() {
      return this.curPage == this.$route.name;
    },
    canLoadProfile() {
      return !this.loadedProfileCount;
    },
    canResetLoaded() {
      return this.canLoadProfile || this.changedPageCount || !this.isSamePage;
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
    changedPage() {
      if (this.isSamePage) return;

      this.changedPageCount++;
    },
    loadProfileAndPageData() {
      if (this.canResetLoaded) {
        this.resetLoadedCounters();
      }

      if (this.canLoadProfile) {
        this.readProfile();
        this.loadedProfileCount++;
      }

      this.loadData();
    },
  },
  created() {
    this.isItFront(this.$route.meta.isFront);
    this.curPage = this.$route.name;
    this.loadProfileAndPageData();
  },
  beforeUpdate() {
    this.changedPage();
    this.loadProfileAndPageData();
  },
};
</script>

<style lang="scss">
@import '@frontStyles/common';
</style>
