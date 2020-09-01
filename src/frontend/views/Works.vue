<template lang="pug">
Fragment
  TopWrapper
    SliderCmp.top_wrap-content(:items='dbData')
  BottomWrapper.bottom_wrap--without_bg.parallax_mirror
    .parallax_mirror-img
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
};
</script>

<style lang="scss">
@import '@frontStylesPgs/Works/import';
@import '@frontStylesCmp/BottomParallax/import';
</style>
