<template lang="pug">
  ul#parallax.parallax(:class="classes")
    //- .parallax-container
    li.parallax-layer(v-for="(item, index) in layers" :data-depth="item")
      img.parallax-img(:src="img(index)")
    //- .parallax-content
</template>

<script>
const images = {
  png: require.context("@/assets/img/parallax/", false, /layer_\d+\.png$/)
};

import $ from "jquery";
import getImg from "@common/helpers/getImg";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "ParallaxCmp",
  data() {
    return {
      $parallaxContainer: document.getElementById("parallax"),
      // $container,
      $layers: false,
      centerX: 0,
      centerY: 0,
      initialX: 0,
      initialY: 0,
      scrollY: 0,
      divider: 0,
      positionX: 0,
      positionY: 0,
      bottomPosition: 0,
      transformString: "",
      path: "../../assets/img/parallax",
      ext: "png",
      layers: [100, 100, 90, 80, 70, 60, 15, 10]
    };
  },
  computed: {
    ...mapGetters(["config"]),
    classes() {
      return { "parallax--scroll": this.config.isContent };
    }
  },
  methods: {
    img(index) {
      return getImg("layer_" + (index + 1) + ".png", images);
    },
    moveLayers(event) {
      const $vm = this;
      const isScroll = this.config.isContent;

      if (isScroll) {
        this.scrollY = window.pageYOffset || document.documentElement.scrollTop;
      }

      this.initialX = isScroll ? this.centerX : this.centerX - event.pageX;
      this.initialY = isScroll
        ? this.centerY - this.scrollY
        : this.centerY - event.pageY;

      if (this.$layers) {
        [].slice.call(this.$layers).forEach(function($layer, index) {
          if (isScroll) {
            $vm.divider = (index + 1) / 90;
          } else {
            $vm.divider = ((index + 1) * $layer.dataset.depth) / 10000;
          }

          // console.log($layer.dataset.depth);

          $vm.positionY = $vm.initialY * $vm.divider;
          $vm.bottomPosition = (window.innerHeight / 2) * $vm.divider;

          if (isScroll) {
            $vm.transformString = `translateY(${$vm.positionY}px)`;
          } else {
            $vm.positionX = $vm.initialX * $vm.divider;
            $vm.transformString = `translate(${$vm.positionX}px, ${$vm.positionY}px)`;
          }

          $layer.style.transform = $vm.transformString;
          $layer.firstElementChild.style.bottom = `-${$vm.bottomPosition}px`;
        });
      }
    }
  },
  mounted() {
    const $vm = this;
    console.log(images.png.length);

    $(document).ready(() => {
      const isScroll = $vm.config.isContent;

      $vm.$parallaxContainer = document.getElementById("parallax");

      $vm.centerX = window.innerWidth / 2;
      $vm.centerY = window.innerHeight / 2;

      if ($vm.$parallaxContainer) {
        // if ($vm.$parallaxContainer.classList.contains("parallax--scroll")) {
        //   isScroll = true;
        // }

        // $container = $vm.$parallaxContainer.firstElementChild
        $vm.$layers = $vm.$parallaxContainer.children;

        if (isScroll) {
          window.addEventListener("scroll", $vm.moveLayers);
          window.dispatchEvent(new Event("scroll"));
        } else {
          window.addEventListener("mousemove", $vm.moveLayers);
        }
      }
    });
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/Parallax/import.scss"></style>
