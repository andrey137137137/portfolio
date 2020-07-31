<template lang="pug">
#bottomParallax.parallax_mirror
  //- img.parallax_mirror-img(src="@assets/img/bottom.jpg")
  .parallax_mirror-img
</template>

<script>
import $ from 'jquery';
import ImageWrapper from '@frontCmp/ImageWrapper';

export default {
  name: 'WorksParallax',
  components: {
    ImageWrapper,
  },
  data() {
    return {
      $parallaxContainer: null,
      $parallax: null,
      $bottomWrapper: null,
      $footer: null,
    };
  },
  methods: {
    moveLayers() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const bottomImgPos =
        (document.body.scrollHeight - (window.innerHeight + scrollY)) * 0.05;
      this.$parallax.style.transform = `translateY(-${bottomImgPos}px)`;
    },
    changeHeight() {
      this.$parallaxContainer.style.height =
        this.$bottomWrapper.offsetHeight + this.$footer.offsetHeight + 'px';
      this.moveLayers();
    },
  },
  mounted() {
    const $vm = this;

    this.$nextTick(() => {
      $(document).ready(() => {
        $vm.$bottomWrapper = document.getElementById('bottomWrapper');
        $vm.$footer = document.getElementById('footer');
        $vm.$parallaxContainer = document.getElementById('bottomParallax');
        $vm.$parallax = $vm.$parallaxContainer.firstElementChild;

        window.addEventListener('scroll', $vm.moveLayers);
        window.addEventListener('resize', $vm.changeHeight);

        $vm.changeHeight();
      });
    });
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/WorksParallax/import';
</style>
