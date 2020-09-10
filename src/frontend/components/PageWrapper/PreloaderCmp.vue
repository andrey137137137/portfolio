<template lang="pug">
.preloader.preloader--active(ref='preloader', :class='testClass')
  .preloader-container
    svg.preloader-circles
      circle.preloader-center_circle(ref='circle')
      circle.preloader-satellite_circle(ref='satellite')
    .preloader-counter(ref='counter') {{ animatedNumber }}
</template>

<script>
import { gsap } from 'gsap';
import { mapGetters } from 'vuex';

export default {
  name: 'PreloaderCmp',
  data() {
    return {
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
    testClass() {
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

      this.intervalID = setInterval(() => {
        $vm.imagesLoading();
      }, 100);
    },
    reset() {
      if (this.dbDataLoadedCount == 0) {
        this.imageCount = 1000;
        this.imageCounter = 0;
        this.prs = 0;
        this.tweenedNumber = 0;
        this.$refs.preloader.classList.add(this.activeClass);
        this.$refs.preloader.style.display = 'block';
        this.startLoading();
      }
    },
    imagesLoading() {
      if (this.dbDataLoadingCount == this.dbDataLoadedCount) {
        clearInterval(this.intervalID);

        const $images = document.images;
        this.imageCount = $images.length;

        for (let i = 0; i < this.imageCount; i++) {
          const $imageClone = new Image();
          $imageClone.onload = this.imageLoaded;
          $imageClone.onerror = this.imageLoaded;
          $imageClone.src = $images[i].src;
        }
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
            $vm.$refs.preloader.style.display = 'none';
          }, 500);
        }, 1000);
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
  },
  mounted() {
    console.log('PreloaderCmp mounted ' + this.$options.name);
    this.startLoading();
  },
  beforeUpdate() {
    console.log('PreloaderCmp beforeUpdate ' + this.$options.name);
    this.reset();
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/Preloader/import';
</style>
