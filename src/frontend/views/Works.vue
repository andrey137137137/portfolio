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
import pageConfigMixin from '@frontend/mixins/pageConfigMixin';
import TopWrapper from '@frontCmp/TopWrapper';
import SliderCmp from '@frontCmp/SliderCmp';
import BottomWrapper from '@frontCmp/BottomWrapper';
import FeedbackCmp from '@frontCmp/FeedbackCmp';
import ScrollButton from '@frontCmp/ScrollButton';

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
  mixins: [pageConfigMixin],
};
</script>

<style lang="scss">
@import '@frontStylesPgs/Works/import';
</style>
