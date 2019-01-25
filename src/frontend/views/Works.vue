<template lang="pug">
  FullPageWrapper
    TopWrapper
      SectionWrapper(name="slider" :isFullWidth="true" :isOwnContainerClass="true")
        ul.slider__list
          li.slider__item.slider__item-active
          li.slider__item
          li.slider__item
          li.slider__item
        
        article.slider__text_wrap
          h2.section__title.section__title-uppercase.section__title-underlined.slider__title Сайт школы онлайн Образования
          p.section__desc.slider__desc HTML , CSS, JAVASCRIPT
          a.clearfix.btn.slider__btn(href="")
            span.icon.icon-link.slider__btn_icon
            span.slider__btn_text Посмотреть сайт

        .clearfix.slider__nav
          a.icon.icon-chevron_down.slider__arrow.slider__arrow-prev(href="")
          a.icon.icon-chevron_up.slider__arrow.slider__arrow-next(href="")

    BottomWrapper(:addClasses="{'bottom_wrap-bg': true}")
      FeedbackForm
</template>

<script>
import pageConfig from "@frontend/mixins/pageConfig";
import FullPageWrapper from "@frontCmp/FullPageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";
import SectionWrapper from "@frontCmp/SectionWrapper";
import TitleWrapper from "@frontCmp/TitleWrapper";
import BottomWrapper from "@frontCmp/BottomWrapper";
import FeedbackForm from "@frontCmp/Forms/FeedbackForm";

export default {
  name: "WorksView",
  components: {
    FullPageWrapper,
    TopWrapper,
    SectionWrapper,
    TitleWrapper,
    BottomWrapper,
    FeedbackForm
  },
  mixins: [pageConfig],
  data() {
    return {
      dbPage: "works",
      configParams: {
        name: "Мои работы",
        isTopWrapTitle: true,
        isContent: true,
        sections: 3
      }
    };
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Works.scss">
</style>
