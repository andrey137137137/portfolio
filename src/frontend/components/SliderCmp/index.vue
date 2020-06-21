<template lang="pug">
  SectionWrapper(:name="id" :isContainerClass="false" :isOwnContainerClass="true")

    ul(style="display:none")
      li(v-for="item in items") {{item.title}}

    ul.slider-demo
      transition(:name="transitionName")
        li.img_wrap.slider-item.slider-demo_item(:key="curIndex")
          img.img_wrap-img(:src="demoImg" :alt="title")
          .slider-item_number.slider-demo_item_number {{curIndex + 1}}

    article.slider-text_wrap
      AnimateStr(
        transitionName="slider-title"
        rootElem="h2"
        :str="title"
        :commonKey="curIndex"
        :addClasses="titleClasses"
      )
      AnimateStr(
        transitionName="slider-techs"
        rootElem="p"
        :str="techs"
        :commonKey="curIndex"
        :addClasses="techsClasses"
      )
      a.clearfix.btn.slider-btn(:href="link" target="_blank")
        span.icon.icon--link.slider-btn_icon
        span.slider-btn_text Посмотреть сайт

    .clearfix.slider-nav
      ArrowButton(
        :index="curIndex"
        :newIndex="prevIndex"
        :handle="handlePrev"
        :imgSrc="prevImg"
        :isNext="false"
      )
      ArrowButton(
        :index="curIndex"
        :newIndex="nextIndex"
        :handle="handleNext"
        :imgSrc="nextImg"
      )
</template>

<script>
// const images = {
//   png: require.context("@/../public/userfiles/", false, /\.png$/),
//   jpg: require.context("@/../public/userfiles/", false, /\.jpg$/)
// };

// import getImg from "@common/helpers/getImg";
import SectionWrapper from "@frontCmp/SectionWrapper";
import AnimateStr from "./AnimateStr";
import ArrowButton from "./ArrowButton";

export default {
  name: "SliderCmp",
  components: {
    SectionWrapper,
    AnimateStr,
    ArrowButton
  },
  props: {
    items: {
      type: Array,
      // required: true,
      default() {
        return [
          {
            image: "test1.jpg",
            link: "http://test1.link/",
            techs: ["html 1", "css 1", "js 1"],
            title: "Test Title 1"
          },
          {
            image: "test2.jpg",
            link: "http://test2.link/",
            techs: ["html 2", "css 2", "js 2"],
            title: "Test Title 2"
          }
        ];
      }
    },
    id: {
      type: String,
      default: "slider"
    }
  },
  data() {
    return {
      transitionMethod: "scroll_up",
      duration: 3000,
      curIndex: 0,
      // count: this.items.length,
      intervalID: null,
      titleClasses: {
        "section-title": true,
        "section-title--uppercase": true,
        "section-title--underlined": true,
        "slider-title": true
      },
      techsClasses: {
        "section-desc": true,
        "slider-desc": true
      }
    };
  },
  computed: {
    transitionName() {
      return `slider--${this.transitionMethod}`;
    },
    prevIndex() {
      let tempIndex = this.curIndex - 1;

      if (tempIndex < 0) {
        // return this.count - 1;
        return this.items.length - 1;
      }

      return tempIndex;
    },
    nextIndex() {
      // return (this.curIndex + 1) % this.count;
      return (this.curIndex + 1) % this.items.length;
    },
    demoImg() {
      // return getImg(this.items[this.curIndex].image, images);
      return "/upload/slider/" + this.items[this.curIndex].image;
    },
    prevImg() {
      // return getImg(this.items[this.prevIndex].image, images);
      return "/upload/slider/" + this.items[this.prevIndex].image;
    },
    nextImg() {
      // return getImg(this.items[this.nextIndex()].image, images);
      return "/upload/slider/" + this.items[this.nextIndex].image;
    },
    title() {
      return this.items[this.curIndex].title;
    },
    techs() {
      return this.items[this.curIndex].techs.join(", ");
    },
    link() {
      return this.items[this.curIndex].link;
    }
  },
  methods: {
    changeSlide(direction = 1) {
      if (direction < 0) {
        this.curIndex = this.prevIndex;
        this.transitionMethod = "scroll_down";
      } else {
        this.curIndex = this.nextIndex;
        this.transitionMethod = "scroll_up";
      }
    },
    resetInterval() {
      const $vm = this;

      clearInterval(this.intervalID);
      this.intervalID = setInterval(() => {
        $vm.changeSlide();
      }, $vm.duration);
    },
    handlePrev() {
      this.changeSlide(-1);
      this.resetInterval();
    },
    handleNext() {
      this.changeSlide();
      this.resetInterval();
    }
  },
  created() {
    this.resetInterval();
  }
};
</script>
