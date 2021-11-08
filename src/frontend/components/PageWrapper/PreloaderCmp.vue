<template lang="pug">
div(ref='preloader', :class='rootClass')
  .preloader-container(:class='isChangedPage')
    svg.preloader-circles
      circle.preloader-center_circle(ref='circle')
      circle.preloader-satellite_circle(ref='satellite')
    .preloader-counter(ref='counter') {{ animatedNumber }}
</template>

<script>
// import { gsap } from 'gsap';
import { mapGetters } from 'vuex';
import {
  IMAGES_LOADING,
  PRELOADER_CLASSES_REMOVING,
  PRELOADER_HIDDEN,
} from '@common/constants/timeouts';

export default {
  name: 'PreloaderCmp',
  data() {
    return {
      rootClass: 'preloader',
      activeClass: 'preloader--active',
      intervalID: 0,
      imageCount: 1000,
      imageCounter: 0,
      prs: 0,
      tweenedNumber: 0,
    };
  },
  computed: {
    ...mapGetters(['dbDataLoadingCount', 'dbDataLoadedCount']),
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
    startLoading() {
      const $vm = this;

      $vm.$refs.preloader.classList.add(this.activeClass);

      this.intervalID = setInterval(() => {
        $vm.imagesLoading();
      }, IMAGES_LOADING);
    },
    reset() {
      if (this.dbDataLoadedCount == 0) {
        this.imageCount = 1000;
        this.imageCounter = 0;
        this.prs = 0;
        this.tweenedNumber = 0;
        this.$refs.preloader.style.display = 'block';
        this.startLoading();
      }
    },
    imagesLoading() {
      if (this.dbDataLoadingCount == this.dbDataLoadedCount) {
        clearInterval(this.intervalID);
        const $vm = this;

        // $vm.$nextTick(() => {
        const $images = document.querySelectorAll(
          'source:not(.lazy), img:not(.lazy)',
        );
        $vm.imageCount = $images.length;
        console.log('Reset');

        for (let i = 0; i < $vm.imageCount; i++) {
          console.log(i);
          console.log($vm.imageCount);
          const $imageClone = new Image();
          $imageClone.onload = $vm.imageLoaded;
          $imageClone.onerror = $vm.imageLoaded;
          $imageClone.src = $images[i].src;
        }
        // });
      }
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
      // gsap.to(this.$data, {
      //   duration: 0.5,
      //   tweenedNumber: newValue,
      // });
      this.tweenedNumber = newValue;
    },
  },
  mounted() {
    console.log(this.$options.name + ' mounted');
    this.startLoading();
  },
  beforeUpdate() {
    if (!this.isActive) {
      console.log(this.$options.name + ' beforeUpdate');
      this.reset();
    }
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/Preloader/import';
</style>
