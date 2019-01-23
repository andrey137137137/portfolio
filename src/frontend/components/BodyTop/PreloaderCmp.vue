<template lang="pug">
  #preloader.preloader.preloader-active
    .preloader__container
      //- svg.preloader__circles
      //-   use(xlink:href="../img/night.svg#preloader")
      svg.preloader__circles
        circle.preloader__center_circle
        circle.preloader__satellite_circle
      .preloader__counter
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
      $vm.$preloader.classList.add(`preloader-prs_${$vm.prs}`);
      // $vm.$satellite.style.transform = `rotate(${$vm.prs * 7.2}deg)`;
      // $vm.$circle.style.strokeDasharray = `${($vm.prs * $vm.circleLength) /
      //   100} ${$vm.circleLength}`;
      // $vm.$counter.innerHTML = $vm.prs;
      // }, 100);

      if ($vm.counter >= $vm.count) {
        setTimeout(function() {
          $vm.$preloader.classList.remove("preloader-active");
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
        ".preloader__satellite_circle"
      );
      $vm.$circle = $vm.$preloader.querySelector(".preloader__center_circle");
      $vm.$counter = $vm.$preloader.querySelector(".preloader__counter");
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
