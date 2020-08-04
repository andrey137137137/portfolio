<template lang="pug">
#preloader.preloader.preloader--active
  .preloader-container
    svg.preloader-circles
      circle.preloader-center_circle
      circle.preloader-satellite_circle
    .preloader-counter {{ animatedNumber }}
</template>

<script>
import $ from 'jquery';
import { gsap } from 'gsap';

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
      count: 0,
      // circleLength: 106.811,
      counter: 0,
      prs: 0,
      tweenedNumber: 0,
    };
  },
  computed: {
    animatedNumber: function () {
      return this.tweenedNumber.toFixed(0);
    },
  },
  methods: {
    imageLoaded() {
      const $vm = this;

      $vm.counter++;
      $vm.prs = Math.floor(($vm.counter * 100) / $vm.count);

      $vm.$preloader.classList.add(`preloader--prs_${$vm.prs}`);

      if ($vm.counter >= $vm.count) {
        setTimeout(function () {
          $vm.$preloader.classList.remove('preloader--active');
        }, 500);
        setTimeout(function () {
          $vm.$preloader.parentElement.removeChild($vm.$preloader);
        }, 1500);
      }
    },
  },
  watch: {
    prs(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
    },
  },
  mounted() {
    const $vm = this;

    $(document).ready(() => {
      $vm.$preloader = document.getElementById('preloader');
      $vm.$satellite = $vm.$preloader.querySelector(
        '.preloader-satellite_circle',
      );
      $vm.$circle = $vm.$preloader.querySelector('.preloader-center_circle');
      $vm.$counter = $vm.$preloader.querySelector('.preloader-counter');
      $vm.$images = document.images;
      $vm.count = $vm.$images.length;

      for (let i = 0; i < $vm.count; i++) {
        $vm.$imageClone = new Image();
        $vm.$imageClone.onload = $vm.imageLoaded;
        $vm.$imageClone.onerror = $vm.imageLoaded;
        $vm.$imageClone.src = $vm.$images[i].src;
      }
    });
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/Preloader/import';
</style>
