<template lang="pug">
  FullPageWrapper
    TopWrapper
      SliderCmp
    BottomWrapper(:addClasses="bottomWrapClass")
      section#reviews.section.container.reviews

        TitleWrapper(
          title="Что обо мне говорят"
          bgIcon="stars3"
          containerAddClass="reviews__title_wrap"
          titleAddClass="reviews__title"
        )

        article.col.col-float.col-tb_6.col-ds_4.reviews__article(v-for="(review, index) in dbData" class="{'reviews__article-first': !index}")
          .icon.icon-quote.reviews__quote
          picture.img_wrap.reviews__img_wrap
            source.img_wrap__img(srcset="userfiles/reviews/m/" + (index + 1) + ".jpg" media="(min-width: 768px)")
            img.img_wrap__img(srcset="userfiles/reviews/s/" + (index + 1) + ".jpg" alt="review.author")
          .reviews__text_wrap
            p.section__desc.reviews__desc {{review.description}}
            span.reviews__author {{review.author}}
            span.reviews__status
              | &#8212;
              | {{review.status}}

      FeedbackForm
</template>

<script>
import pageConfig from "@frontend/mixins/pageConfig";
import FullPageWrapper from "@frontCmp/FullPageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";
import SliderCmp from "@frontCmp/SliderCmp";
import BottomWrapper from "@frontCmp/BottomWrapper";
import TitleWrapper from "@frontCmp/TitleWrapper";
import FeedbackForm from "@frontCmp/Forms/FeedbackForm";

export default {
  name: "WorksView",
  components: {
    FullPageWrapper,
    TopWrapper,
    SliderCmp,
    BottomWrapper,
    TitleWrapper,
    FeedbackForm
  },
  mixins: [pageConfig],
  data() {
    return {
      // dbPage: "review",
      // configParams: {
      //   name: "Мои работы",
      //   isTopWrapTitle: true,
      //   isContent: true,
      //   sections: 3
      // },
      bottomWrapClass: {
        "bottom_wrap-bg": true
      }
    };
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Works.scss">
</style>
