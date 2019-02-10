<template lang="pug">
  SectionWrapper(:name="id" :isFullWidth="true" :isOwnContainerClass="true")
    ul.slider__list
      li.slider__item(
        v-for="(item, index) in items"
        :key="item._id"
        :class="getItemClass(index)")
    
    article.slider__text_wrap
      transition-group(
        name="slider__title"
        tag="h2"
        appear
        :class="titleClasses"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      )
        span.slider__letter(
          v-for="(symbol, index) in title"
          :key="getSymbolKey(symbol, index)"
          :data-index="index"
        ) {{symbol}}
      p.section__desc.slider__desc(ref="techs") {{techs}}
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
import $ from "jQuery";
import SectionWrapper from "@frontCmp/SectionWrapper";

export default {
  name: "SliderCmp",
  components: {
    SectionWrapper
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
      $slides: null,
      $activeSlide: null,
      $prevSlide: null,
      $nextSlide: null,
      $firstSlide: null,
      $lastSlide: null,
      duration: 500,
      curIndex: 0,
      count: this.items.length,
      symbols: []
    };
  },
  computed: {
    title() {
      return this.items[this.curIndex].title;
    },
    techs() {
      return this.items[this.curIndex].techs.join(", ");
    },
    titleLength() {
      return this.title.length;
    },
    titleDuration() {
      return Math.ceil((this.duration * 10) / this.titleLength);
    },
    titleDelay() {
      return Math.ceil((150 * 10) / this.titleLength);
    },
    titleClasses() {
      return [
        "section__title",
        "section__title-uppercase",
        "section__title-underlined",
        "slider__title"
      ];
    }
  },
  methods: {
    getItemClass(index) {
      return !index ? "slider__item-active" : "";
    },
    getSymbolKey(symbol, index) {
      return this.curIndex + symbol + index;
    },
    beforeEnter: function(el) {
      console.log("beforeEnter");

      el.style.opacity = 0;
    },
    enter: function(el, done) {
      console.log("enter");

      var delay = el.dataset.index * this.titleDelay;
      setTimeout(function() {
        // Velocity(el, { opacity: 1, height: "1.6em" }, { complete: done });
        $(el).animate(
          {
            opacity: 1
          },
          this.titleDuration,
          done
        );
      }, delay);
    },
    leave: function(el, done) {
      console.log("leave");

      // var delay = el.dataset.index * this.titleDelay;
      // setTimeout(function() {
      // Velocity(el, { opacity: 0, height: 0 }, { complete: done });
      $(el).animate(
        {
          opacity: 0
        },
        1,
        done
      );
      // }, delay);
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
