<template lang="pug">
#preloader.preloader.preloader--active
  .preloader-container
    svg.preloader-circles
      circle.preloader-center_circle
      circle.preloader-satellite_circle
    .preloader-counter {{ animatedNumber }}
</template>

<script>
import { gsap } from 'gsap';
import { mapGetters } from 'vuex';

export default {
  name: 'PreloaderCmp',
  data() {
    return {
      $preloader: null,
      $satellite: null,
      $circle: null,
      $counter: null,
      $images: null,
      $imageClone: null,
      intervalID: 0,
      count: 0,
      counter: 0,
      prs: 0,
      tweenedNumber: 0,
    };
  },
  computed: {
    ...mapGetters(['dbDataLoadingCount', 'dbDataLoadedCount']),
    animatedNumber() {
      return this.tweenedNumber.toFixed(0);
    },
  },
  methods: {
    imagesLoading() {
      if (this.dbDataLoadingCount == this.dbDataLoadedCount) {
        clearInterval(this.intervalID);

        this.$images = document.images;
        this.count = this.$images.length;

        for (let i = 0; i < this.count; i++) {
          this.$imageClone = new Image();
          this.$imageClone.onload = this.imageLoaded;
          this.$imageClone.onerror = this.imageLoaded;
          this.$imageClone.src = this.$images[i].src;
        }
      }
    },
    imageLoaded() {
      const $vm = this;

      $vm.counter++;
      $vm.prs = Math.floor(($vm.counter * 100) / $vm.count);

      $vm.$preloader.classList.add(`preloader--prs_${$vm.prs}`);

      if ($vm.counter >= $vm.count) {
        setTimeout(() => {
          $vm.$preloader.classList.remove('preloader--active');
        }, 500);
        setTimeout(() => {
          $vm.$preloader.parentElement.removeChild($vm.$preloader);
        }, 1500);
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
    const $vm = this;

    $vm.$preloader = document.getElementById('preloader');
    $vm.$satellite = $vm.$preloader.querySelector(
      '.preloader-satellite_circle',
    );
    $vm.$circle = $vm.$preloader.querySelector('.preloader-center_circle');
    $vm.$counter = $vm.$preloader.querySelector('.preloader-counter');

    $vm.intervalID = setInterval(() => {
      $vm.imagesLoading();
    }, 100);
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/Preloader/import';
</style>
