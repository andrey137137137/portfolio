<template lang="pug">
div(ref='preloader', :class='getRootClasses()')
  .preloader-container(:class='isChangedPage')
    svg.preloader-circles
      circle.preloader-center_circle(ref='circle')
      circle.preloader-satellite_circle(ref='satellite')
    .preloader-counter(ref='counter') {{ animatedNumber }}
</template>

<script>
import { gsap } from 'gsap';
import { mapGetters } from 'vuex';
import {
  PRELOADER_CLASSES_REMOVING,
  PRELOADER_HIDDEN,
} from '@common/constants/timeouts';

export default {
  name: 'PreloaderCmp',
  data() {
    return {
      rootClass: 'preloader',
      activeClass: 'preloader--active',
      imageCount: 100000000000,
      imageCounter: 0,
      prs: 0,
      tweenedNumber: 0,
      isFirstLoading: true,
    };
  },
  computed: {
    ...mapGetters(['dbDataLoadedCount', 'dbDataLoadingCount']),
    isChangedPage() {
      return {
        isLoading: !this.dbDataLoadedCount,
      };
    },
    isDataLoading() {
      return (
        this.dbDataLoadingCount == 0 ||
        this.dbDataLoadingCount > this.dbDataLoadedCount
      );
    },
    areImagesLoading() {
      return this.imageCounter < this.imageCount;
    },
    isActive() {
      return this.isDataLoading || this.areImagesLoading;
    },
    animatedNumber() {
      return this.tweenedNumber.toFixed(0);
    },
  },
  methods: {
    getRootClasses() {
      return this.rootClass + ' ' + this.activeClass;
    },
    imagesLoading() {
      if (
        !this.dbDataLoadingCount ||
        this.dbDataLoadedCount != this.dbDataLoadingCount
      ) {
        return;
      }

      const $vm = this;

      $vm.$nextTick(() => {
        const $images = document.querySelectorAll(
          'source:not(.lazy), img:not(.lazy)',
        );
        $vm.imageCount = $images.length;

        for (let i = 0; i < $vm.imageCount; i++) {
          const $imageClone = new Image();
          $imageClone.onload = $vm.imageLoaded;
          $imageClone.onerror = $vm.imageLoaded;
          $imageClone.src = $images[i].src;
        }
      });
    },
    imageLoaded() {
      this.imageCounter++;
      this.prs = Math.floor((this.imageCounter * 100) / this.imageCount);
      this.$refs.preloader.classList.add(`preloader--prs_${this.prs}`);

      if (!this.isActive) {
        const $vm = this;
        setTimeout(() => {
          $vm.$refs.preloader.classList.remove(this.activeClass);
          setTimeout(() => {
            $vm.$refs.preloader.className = $vm.rootClass;
            $vm.$refs.preloader.style.display = 'none';
          }, PRELOADER_CLASSES_REMOVING);
        }, PRELOADER_HIDDEN);
      }
    },
  },
  watch: {
    prs(newValue) {
      gsap.to(this.$data, {
        duration: 0.5,
        tweenedNumber: newValue,
      });
    },
    dbDataLoadedCount(newValue) {
      if (!newValue && !this.isFirstLoading) {
        this.imageCount = 100000000000;
        this.imageCounter = 0;
        this.prs = 0;
        this.tweenedNumber = 0;
        this.$refs.preloader.style.display = 'block';
        this.$refs.preloader.classList.add(this.activeClass);
      } else {
        if (this.isFirstLoading) {
          this.isFirstLoading = false;
        }
      }
      this.imagesLoading();
    },
    dbDataLoadingCount() {
      this.imagesLoading();
    },
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/Preloader/import';
</style>
