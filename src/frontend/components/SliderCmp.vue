<template lang="pug">
  SectionWrapper(:name="id" :isFullWidth="true" :isOwnContainerClass="true")
    ul.slider__demo
      transition(:name="transitionName")
        li.img_wrap.slider__item.slider__demo_item(:key="curIndex")
          img.img_wrap__img(src="../../assets/userfiles/slide.png" :alt="curIndex + 1")

    article.slider__text_wrap
      AnimateStr(
        transitionName="slider__title"
        rootElem="h2"
        :str="title"
        :commonKey="curIndex"
        :addClasses="titleClasses"
      )
      AnimateStr(
        transitionName="slider__techs"
        rootElem="p"
        :str="techs"
        :commonKey="curIndex"
        :addClasses="techsClasses"
      )
      a.clearfix.btn.slider__btn(ref="link" :href="items[0].link" target="_blank")
        span.icon.icon-link.slider__btn_icon
        span.slider__btn_text Посмотреть сайт

    .clearfix.slider__nav
      a.icon.icon-chevron_down.slider__arrow.slider__arrow-prev(
        href=""
        @click.prevent="handlePrev"
      )
        transition(name="slider__arrow-scroll_down")
          .img_wrap.slider__item(:key="curIndex")
            img.img_wrap__img(src="../../assets/userfiles/prev.jpg" :alt="curIndex + 1")

      a.icon.icon-chevron_up.slider__arrow.slider__arrow-next(
        href=""
        @click.prevent="handleNext"
      )
        transition(name="slider__arrow-scroll_up")
          .img_wrap.slider__item(:key="curIndex")
            img.img_wrap__img(src="../../assets/userfiles/next.jpg" :alt="curIndex + 1")
</template>

<script>
import SectionWrapper from "@frontCmp/SectionWrapper";
import AnimateStr from "@frontCmp/AnimateStr";

export default {
  name: "SliderCmp",
  components: {
    SectionWrapper,
    AnimateStr
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      default: "slider"
    }
  },
  data() {
    return {
      transitionMethod: "scroll_up",
      duration: 500,
      curIndex: 0,
      count: this.items.length,
      titleClasses: {
        section__title: true,
        "section__title-uppercase": true,
        "section__title-underlined": true,
        slider__title: true
      },
      techsClasses: {
        section__desc: true,
        slider__desc: true
      }
    };
  },
  computed: {
    transitionName() {
      return `slider__item-${this.transitionMethod}`;
    },
    title() {
      return this.items[this.curIndex].title;
    },
    techs() {
      return this.items[this.curIndex].techs.join(", ");
    }
  },
  methods: {
    handlePrev() {
      let tempIndex = this.curIndex - 1;

      this.transitionMethod = "scroll_down";

      if (tempIndex < 0) {
        this.curIndex = this.count - 1;
      } else {
        this.curIndex = tempIndex;
      }
    },
    handleNext() {
      this.transitionMethod = "scroll_up";
      this.curIndex = (this.curIndex + 1) % this.count;
    }
  }
};
</script>
