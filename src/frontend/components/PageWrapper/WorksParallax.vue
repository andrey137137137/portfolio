<template lang="pug">
  .parallax_mirror(v-if="isWorks")
    img.parallax_mirror-img(src="@assets/img/bottom.jpg")
</template>

<script>
import $ from "jquery";
import ImageWrapper from "@frontCmp/ImageWrapper";

export default {
  name: "ParallaxCmp",
  components: {
    ImageWrapper
  },
  data() {
    return {
      $bottomParallax: null
    };
  },
  methods: {
    moveLayers() {
      const $vm = this;
      this.scrollY = window.pageYOffset || document.documentElement.scrollTop;

      const bottomImgPos =
        document.body.scrollHeight - (window.innerHeight + $vm.scrollY);
      $vm.$bottomParallax.style.bottom = `${bottomImgPos}px`;
      // console.log(bottomImgPos);
    }
  },
  mounted() {
    const $vm = this;

    $(document).ready(() => {
      $vm.$bottomParallax = document.querySelector(".parallax_mirror-img");
      window.addEventListener("scroll", $vm.moveLayers);
      window.dispatchEvent(new Event("scroll"));
    });
  }
};
</script>

<style lang="scss">
.parallax_mirror {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  height: 1540px;
  width: 100%;

  &-img {
    position: absolute;
    bottom: 0;
    // left: 50%;
    left: 0;
    display: block;
    width: 2001px;
    // width: 100%;
    line-height: 0;
    // transform: translateX(-50%);
  }
}
</style>
