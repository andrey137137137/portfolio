<template lang="pug">
Fragment(:key='$route.name')
  TopWrapper
    SliderCmp.top_wrap-content(:items='dbData')
  BottomWrapper.bottom_wrap--without_bg.parallax_mirror(ref='parallax')
    .parallax_mirror-img(ref='parallaxLayer')
    FeedbackCmp
    ScrollButton(:inHeader='false')
    FooterWrapper
</template>

<script>
import { Fragment } from 'vue-fragment';
import TopWrapper from '@frontCmp/TopWrapper';
import SliderCmp from '@frontCmp/SliderCmp';
import BottomWrapper from '@frontCmp/BottomWrapper';
import FeedbackCmp from '@frontCmp/FeedbackCmp';
import ScrollButton from '@frontCmp/ScrollButton';
import FooterWrapper from '@frontCmp/FooterWrapper';

import { mapGetters } from 'vuex';

export default {
  name: 'WorksView',
  components: {
    Fragment,
    TopWrapper,
    SliderCmp,
    BottomWrapper,
    FeedbackCmp,
    ScrollButton,
    FooterWrapper,
  },
  computed: {
    ...mapGetters(['dbData']),
  },
  // methods: {
  //   moveLayers() {
  //     const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  //     const bottomImgPos =
  //       (document.body.scrollHeight - (window.innerHeight + scrollY)) / 10000;
  //     this.$refs.parallaxLayer.style.transform = `translateY(${bottomImgPos}px)`;
  //   },
  // },
  // mounted() {
  //   window.addEventListener('scroll', this.moveLayers);
  //   window.addEventListener('resize', this.moveLayers);
  //   this.moveLayers();
  // },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.moveLayers);
  //   window.removeEventListener('resize', this.moveLayers);
  // },
};
</script>

<style lang="scss">
@import '@frontStylesPgs/Works/import';
@import '@frontStylesCmp/BottomParallax/import';
</style>
