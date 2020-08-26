<template lang="pug">
Fragment
  TopWrapper
    SliderCmp.top_wrap-content(:items='dbData')
  BottomWrapper.bottom_wrap--without_bg
    FeedbackCmp
    ScrollButton(:inHeader='false')
</template>

<script>
import { Fragment } from 'vue-fragment';
import TopWrapper from '@frontCmp/TopWrapper';
import SliderCmp from '@frontCmp/SliderCmp';
import BottomWrapper from '@frontCmp/BottomWrapper';
import FeedbackCmp from '@frontCmp/FeedbackCmp';
import ScrollButton from '@frontCmp/ScrollButton';

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
  },
  computed: {
    ...mapGetters(['dbData']),
  },
};
</script>

<style lang="scss">
@import '@frontStylesPgs/Works/import';
</style>
