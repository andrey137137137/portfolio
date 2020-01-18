<template lang="pug">
  div
    TopWrapper
      SliderCmp(:slides="slides")
    BottomWrapper(:addClasses="bottomWrapClass")
      //- CommentCmp(:items="dbData")
      FeedbackForm
</template>

<script>
import pageConfig from "@frontend/mixins/pageConfig";
import FullPageWrapper from "@frontCmp/FullPageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";
import SliderCmp from "@frontCmp/SliderCmp";
import BottomWrapper from "@frontCmp/BottomWrapper";
import CommentCmp from "@frontCmp/CommentCmp";
import FeedbackForm from "@frontCmp/Forms/FeedbackForm";

export default {
  name: "WorksView",
  components: {
    FullPageWrapper,
    TopWrapper,
    SliderCmp,
    BottomWrapper,
    CommentCmp,
    FeedbackForm
  },
  mixins: [pageConfig],
  data() {
    return {
      bottomWrapClass: {
        "bottom_wrap-bg": true
      }
    };
  },
  computed: {
    slides() {
      let obj = [];

      for (const key in this.dbData) {
        if (this.dbData.hasOwnProperty(key)) {
          obj.push(this.dbData[key]);
        }
      }

      return obj;
    }
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Works.scss"></style>
