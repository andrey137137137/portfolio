<template lang="pug">
#bottomParallax.parallax_mirror(ref='bottomParallax')
  .parallax_mirror-img
</template>

<script>
import ImageWrapper from '@frontCmp/ImageWrapper';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('bottomParallaxHeight');

export default {
  name: 'BottomParallax',
  components: {
    ImageWrapper,
  },
  data() {
    return {
      timeOutID: 0,
      $parallaxContainer: null,
      $parallax: null,
      $bottomWrapper: null,
      $footer: null,
    };
  },
  computed: {
    ...mapGetters(['bottomHeight', 'footerHeight']),
  },
  methods: {
    // moveLayers() {
    //   const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    //   const bottomImgPos =
    //     (document.body.scrollHeight - (window.innerHeight + scrollY)) / 10000;
    //   this.$parallax.style.transform = `translateY(${bottomImgPos}px)`;
    // },
    changeHeight() {
      const $vm = this;

      if (this.timeOutID) clearTimeout(this.timeOutID);

      this.timeOutID = setTimeout(() => {
        // $vm.$parallaxContainer.style.height =
        //   $vm.$bottomWrapper.offsetHeight + $vm.$footer.offsetHeight + 'px';
        $vm.$parallaxContainer.style.height =
          $vm.bottomHeight + $vm.footerHeight + 'px';
        console.log($vm.bottomHeight);
        console.log($vm.footerHeight);
        // $vm.moveLayers();
      }, 500);
    },
  },
  mounted() {
    const $vm = this;

    this.$nextTick(() => {
      $vm.$bottomWrapper = document.getElementById('bottomWrapper');
      $vm.$footer = document.getElementById('footer');
      $vm.$parallaxContainer = $vm.$refs['bottomParallax'];
      $vm.$parallax = $vm.$parallaxContainer.firstElementChild;

      // window.addEventListener('scroll', $vm.moveLayers);
      window.addEventListener('resize', $vm.changeHeight);

      $vm.changeHeight();
    });
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/BottomParallax/import';
</style>
