<template lang="pug">
  #preloader.preloader.preloader--active
    .preloader-container
      //- svg.preloader-circles
      //-   use(xlink:href="../img/night.svg#preloader")
      svg.preloader-circles
        circle.preloader-center_circle
        circle.preloader-satellite_circle
      .preloader-counter
</template>

<script>
import $ from "jQuery";

export default {
  name: "PreloaderCmp",
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
      prs: 0
    };
  },
  methods: {
    imageLoaded() {
      const $vm = this;

      $vm.counter++;
      $vm.prs = Math.floor(($vm.counter * 100) / $vm.count);

      // setTimeout(function() {
      $vm.$preloader.classList.add(`preloader--prs_${$vm.prs}`);
      // $vm.$satellite.style.transform = `rotate(${$vm.prs * 7.2}deg)`;
      // $vm.$circle.style.strokeDasharray = `${($vm.prs * $vm.circleLength) /
      //   100} ${$vm.circleLength}`;
      // $vm.$counter.innerHTML = $vm.prs;
      // }, 100);

      if ($vm.counter >= $vm.count) {
        setTimeout(function() {
          $vm.$preloader.classList.remove("preloader--active");
        }, 500);
        setTimeout(function() {
          $vm.$preloader.parentElement.removeChild($vm.$preloader);
        }, 1500);
      }
    }
  },
  mounted() {
    const $vm = this;

    $(document).ready(() => {
      $vm.$preloader = document.getElementById("preloader");
      $vm.$satellite = $vm.$preloader.querySelector(
        ".preloader-satellite_circle"
      );
      $vm.$circle = $vm.$preloader.querySelector(".preloader-center_circle");
      $vm.$counter = $vm.$preloader.querySelector(".preloader-counter");
      $vm.$images = document.images;
      $vm.count = $vm.$images.length;

      for (let i = 0; i < $vm.count; i++) {
        $vm.$imageClone = new Image();
        $vm.$imageClone.onload = $vm.imageLoaded;
        $vm.$imageClone.onerror = $vm.imageLoaded;
        $vm.$imageClone.src = $vm.$images[i].src;
      }
    });
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/Preloader/import.scss"></style>
