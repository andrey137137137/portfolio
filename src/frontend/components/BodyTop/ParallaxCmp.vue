<template lang="pug">
  ul#parallax.parallax(:class="classes")
    //- .parallax__container
    li.parallax__layer
      img.parallax__img(src="@/assets/img/parallax/layer_1.png")
    li.parallax__layer
      img.parallax__img(src="@/assets/img/parallax/layer_2.png")
    //- .parallax__content
</template>

<script>
import $ from "jQuery";

import { mapGetters } from "vuex";

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
      layers: 2,
      images: [
        "../../assets/img/parallax/layer_1.png",
        "../../assets/img/parallax/layer_2.png"
      ]
    };
  },
  computed: {
    ...mapGetters(["config"]),
    classes() {
      return { "parallax-scroll": this.config.isContent };
    }
    // images() {
    //   const data = [];

    //   for (var i = 1; i <= this.layers; i++) {
    //     data.push(`${this.path}/layer_${i}.${this.ext}`);
    //   }

    //   return data;
    // }
  },
  methods: {
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
            $vm.divider = (index + 1) / 110;
          }

          $vm.positionY = $vm.initialY * $vm.divider;
          $vm.bottomPosition = (window.innerHeight / 2) * $vm.divider;

          if (isScroll) {
            $vm.transformString = `translateY(${$vm.positionY}px)`;
          } else {
            $vm.positionX = $vm.initialX * $vm.divider;
            $vm.transformString = `translate(${$vm.positionX}px, ${
              $vm.positionY
            }px)`;
          }

          $layer.style.transform = $vm.transformString;
          $layer.firstElementChild.style.bottom = `-${$vm.bottomPosition}px`;
        });
      }
    }
  },
  mounted() {
    const $vm = this;

    $(document).ready(() => {
      const isScroll = $vm.config.isContent;

      $vm.$parallaxContainer = document.getElementById("parallax");

      $vm.centerX = window.innerWidth / 2;
      $vm.centerY = window.innerHeight / 2;

      if ($vm.$parallaxContainer) {
        // if ($vm.$parallaxContainer.classList.contains("parallax-scroll")) {
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

<style lang="scss" src="@frontStylesCmp/ParallaxCmp.scss">
</style>
