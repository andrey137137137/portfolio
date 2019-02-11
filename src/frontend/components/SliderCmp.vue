<template lang="pug">
  SectionWrapper(:name="id" :isFullWidth="true" :isOwnContainerClass="true")
    ul.slider__list
      li.slider__item(
        v-for="(item, index) in items"
        :key="item._id"
        :class="getItemClass(index)")
    
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
        @click.prevent="handlePrev")
      a.icon.icon-chevron_up.slider__arrow.slider__arrow-next(
        href=""
        @click.prevent="handleNext")
</template>

<script>
// import Velocity from "velocity";
// import $ from "jQuery";

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
      // $slides: null,
      // $activeSlide: null,
      // $prevSlide: null,
      // $nextSlide: null,
      // $firstSlide: null,
      // $lastSlide: null,
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
    title() {
      return this.items[this.curIndex].title;
    },
    techs() {
      return this.items[this.curIndex].techs.join(", ");
    }
  },
  methods: {
    getItemClass(index) {
      return !index ? "slider__item-active" : "";
    },
    handlePrev() {
      let tempIndex = this.curIndex - 1;

      if (tempIndex < 0) {
        this.curIndex = this.count - 1;
      } else {
        this.curIndex = tempIndex;
      }
    },
    handleNext() {
      this.curIndex = (this.curIndex + 1) % this.count;
    }
    // moveSlide($slide) {
    //   const $vm = this;
    //   // const curItem = $vm.items[$vm.curIndex];
    //   let $movableSlide = $slide;

    //   $movableSlide.css("opacity", 0).addClass("slider__item-movable");

    //   // this.$activeSlide.animate({'opacity': 0}, duration);
    //   $movableSlide.animate({ opacity: 1 }, this.duration, function() {
    //     let $this = $(this);

    //     // $slides.css('opacity', 0).removeClass('active');
    //     $vm.$slides.removeClass("slider__item-active");
    //     $this.toggleClass("slider__item-movable slider__item-active");
    //     // $vm.$refs.title.innerText = curItem.title;
    //     // $vm.$refs.link.href = curItem.link;
    //   });
    // }
  }
  // mounted() {
  //   const $vm = this;

  //   $(document).ready(() => {
  //     $vm.$slides = $("#" + $vm.id).find(".slider__item");

  //     if (!$vm.$slides.length) {
  //       return;
  //     }

  //     $vm.count = $vm.$slides.length;

  //     $(".slider__arrow").click(function(event) {
  //       event.preventDefault();

  //       let $this = $(this);

  //       $vm.$activeSlide = $vm.$slides.filter(".slider__item-active");
  //       $vm.$prevSlide = $vm.$activeSlide.prev();
  //       $vm.$nextSlide = $vm.$activeSlide.next();
  //       $vm.$firstSlide = $vm.$slides.first();
  //       $vm.$lastSlide = $vm.$slides.last();

  //       if ($this.hasClass("slider__arrow-next")) {
  //         $vm.setCurIndex();

  //         if ($vm.$nextSlide.index() >= 0) {
  //           $vm.moveSlide($vm.$nextSlide);
  //         } else {
  //           $vm.moveSlide($vm.$firstSlide);
  //         }
  //       } else if ($this.hasClass("slider__arrow-prev")) {
  //         $vm.setCurIndex();

  //         if ($vm.$prevSlide.index() >= 0) {
  //           $vm.moveSlide($vm.$prevSlide);
  //         } else {
  //           $vm.moveSlide($vm.$lastSlide);
  //         }
  //       }
  //     });
  //   });
  // }
};
</script>
