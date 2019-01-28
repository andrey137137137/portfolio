<template lang="pug">
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
</template>

<script>
import SectionWrapper from "@frontCmp/SectionWrapper";

export default {
  name: "SliderCmp",
  components: {
    SectionWrapper
  }
};
</script>
