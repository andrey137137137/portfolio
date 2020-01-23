<template lang="pug">
  SectionWrapper(:name="id" :isFullWidth="true" :isOwnContainerClass="true")

    ul.slider__demo
      transition(:name="transitionName")
        li.img_wrap.slider__item.slider__demo_item(:key="curIndex")
          img.img_wrap__img(src="demoImg" alt="")
          .slider__item_number.slider__demo_item_number {{curIndex + 1}}

    ul.menu
      li.menu__item(v-for="item in slides") {{item.title}}

    article.slider__text_wrap
      AnimateStr(
        transitionName="slider__title"
        rootElem="h2"
        :str="title"
        :commonKey="curIndex"
        :addClasses="titleClasses"
      )
        //- v-for="(item, index) in slides"
        //- v-if="index==curIndex"
        //- :key="index"
    AnimateStr(
      transitionName="slider__techs"
      rootElem="p"
      :str="techs"
      :commonKey="curIndex"
      :addClasses="techsClasses"
    )
    a.clearfix.btn.slider__btn(
      :href="link"
      target="_blank"
    )
      span.icon.icon-link.slider__btn_icon
      span.slider__btn_text Посмотреть сайт

    .clearfix.slider__nav
      a.icon.icon-chevron_down.slider__arrow.slider__arrow-prev(
        href=""
        @click.prevent="handlePrev"
      )
        transition(name="slider__arrow-scroll_down")
          .img_wrap.slider__item(:key="curIndex")
            img.img_wrap__img(src="prevImg" :alt="curIndex + 1")
            .slider__item_number.slider__arrow_number {{this.getPrevIndex() + 1}}

      a.icon.icon-chevron_up.slider__arrow.slider__arrow-next(
        href=""
        @click.prevent="handleNext"
      )
        transition(name="slider__arrow-scroll_up")
          .img_wrap.slider__item(:key="curIndex")
            img.img_wrap__img(src="nextImg" :alt="curIndex + 1")
            .slider__item_number.slider__arrow_number {{this.getNextIndex() + 1}}
</template>

<script>
// const images = {
//   png: require.context("@/../public/userfiles/", false, /\.png$/),
//   jpg: require.context("@/../public/userfiles/", false, /\.jpg$/)
// };

// import getImg from "@common/helpers/getImg";
import SectionWrapper from "@frontCmp/SectionWrapper";
import AnimateStr from "./AnimateStr";

export default {
  name: "SliderCmp",
  components: {
    SectionWrapper,
    AnimateStr
  },
  props: {
    slides: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      default: "slider"
    }
  },
  data() {
    // console.log("Slider");
    // console.log(this.$props.slides);

    return {
      transitionMethod: "scroll_up",
      duration: 500,
      curIndex: 0,
      // count: this.slides.length,
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
    demoImg() {
      // return getImg(this.slides[this.curIndex].image, images);
      return "/upload/slider/" + this.slides[this.curIndex].image;
    },
    prevImg() {
      // return getImg(this.slides[this.getPrevIndex()].image, images);
      return "/upload/slider/" + this.slides[this.getPrevIndex()].image;
    },
    nextImg() {
      // return getImg(this.slides[this.getNextIndex()].image, images);
      return "/upload/slider/" + this.slides[this.getNextIndex()].image;
    },
    title() {
      return this.slides[this.curIndex].title;
    },
    techs() {
      return this.slides[this.curIndex].techs.join(", ");
    },
    link() {
      return this.slides[this.curIndex].link;
    }
  },
  methods: {
    getPrevIndex() {
      let tempIndex = this.curIndex - 1;

      if (tempIndex < 0) {
        // return this.count - 1;
        return this.slides.length - 1;
      }

      return tempIndex;
    },
    getNextIndex() {
      // return (this.curIndex + 1) % this.count;
      return (this.curIndex + 1) % this.slides.length;
    },
    handlePrev() {
      this.curIndex = this.getPrevIndex();
      this.transitionMethod = "scroll_down";
    },
    handleNext() {
      this.curIndex = this.getNextIndex();
      this.transitionMethod = "scroll_up";
    }
  }
};
</script>
