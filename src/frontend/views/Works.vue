<template lang="pug">
  Fragment
    TopWrapper
      SliderCmp(:slides="dbData")
    BottomWrapper.bottom_wrap--bg
      CommentCmp
      FeedbackForm
</template>

<script>
import { Fragment } from "vue-fragment";
import pageConfig from "@frontend/mixins/pageConfig";
import TopWrapper from "@frontCmp/TopWrapper";
import SliderCmp from "@frontCmp/SliderCmp";
import BottomWrapper from "@frontCmp/BottomWrapper";
import CommentCmp from "@frontCmp/CommentCmp";
import FeedbackForm from "@frontCmp/Forms/FeedbackForm";

export default {
  name: "WorksView",
  components: {
    Fragment,
    TopWrapper,
    SliderCmp,
    BottomWrapper,
    CommentCmp,
    FeedbackForm
  },
  mixins: [pageConfig]
};
</script>

<style lang="scss">
@import "@frontStylesPgs/Works/import.scss";
</style>
