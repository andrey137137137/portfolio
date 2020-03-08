<template lang="pug">
  div
    TopWrapper
      SliderCmp(:slides="slides")
      //- swiper(:options="swiperOption")
      //-   swiper-slide I'm Slide 1
      //-   swiper-slide I'm Slide 2
      //-   swiper-slide I'm Slide 3
      //-   swiper-slide I'm Slide 4
      //-   swiper-slide I'm Slide 5
      //-   swiper-slide I'm Slide 6
      //-   swiper-slide I'm Slide 7
      //-   .swiper-pagination(slot="pagination")
      //-   .swiper-button-prev(slot="button-prev")
      //-   .swiper-button-next(slot="button-next")
      //-   .swiper-scrollbar(slot="scrollbar")
    BottomWrapper(:addClasses="bottomWrapClass")
      //- CommentCmp(:items="dbData")
      FeedbackForm
</template>

<script>
import pageConfig from "@frontend/mixins/pageConfig";
import FullPageWrapper from "@frontCmp/FullPageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";
import SliderCmp from "@frontCmp/SliderCmp";
// import "swiper/dist/css/swiper.css";
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import BottomWrapper from "@frontCmp/BottomWrapper";
import CommentCmp from "@frontCmp/CommentCmp";
import FeedbackForm from "@frontCmp/Forms/FeedbackForm";

export default {
  name: "WorksView",
  components: {
    FullPageWrapper,
    TopWrapper,
    SliderCmp,
    // swiper,
    // swiperSlide,
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
      // swiperOption: {
      //   pagination: {
      //     el: ".swiper-pagination",
      //     type: "progressbar"
      //   },
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev"
      //   }
      // }
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
    // swiper() {
    //   return this.$refs.mySwiper.swiper;
    // }
  }
  // mounted() {
  //   // current swiper instance
  //   // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
  //   console.log("this is current swiper instance object", this.swiper);
  //   this.swiper.slideTo(3, 1000, false);
  // }
};
</script>

<style lang="scss" src="@frontStylesPgs/Works/import.scss"></style>
