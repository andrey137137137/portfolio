<template lang="pug">
  Fragment
    TopWrapper
      SliderCmp(:items="dbData")
    BottomWrapper.bottom_wrap--without_bg
      CommentCmp
      FeedbackForm
      ScrollButton(:inHeader="false")
</template>

<script>
import { Fragment } from 'vue-fragment';
import pageConfigMixin from '@frontend/mixins/pageConfigMixin';
import TopWrapper from '@frontCmp/TopWrapper';
import SliderCmp from '@frontCmp/SliderCmp';
import BottomWrapper from '@frontCmp/BottomWrapper';
import CommentCmp from '@frontCmp/CommentCmp';
import FeedbackForm from '@frontCmp/forms/FeedbackForm';
import ScrollButton from '@frontCmp/ScrollButton';

export default {
  name: 'WorksView',
  components: {
    Fragment,
    TopWrapper,
    SliderCmp,
    BottomWrapper,
    CommentCmp,
    FeedbackForm,
    ScrollButton,
  },
  mixins: [pageConfigMixin],
};
</script>

<style lang="scss">
@import '@frontStylesPgs/Works/import';
</style>
