<template lang="pug">
  SectionWrapper(name="id" :isFullWidth="true" :isOwnContainerClass="true")
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
      count: 0
    };
  },
  methods: {
    moveSlide(
      $slide
      // direction
    ) {
      const $vm = this;
      let $movableSlide = $slide;

      $movableSlide.css("opacity", 0).addClass("slider__item-movable");

      // this.$activeSlide.animate({'opacity': 0}, duration);
      $movableSlide.animate({ opacity: 1 }, this.duration, function() {
        let $this = $(this);

        // $slides.css('opacity', 0).removeClass('active');
        $vm.$slides.removeClass("slider__item-active");
        $this.toggleClass("slider__item-movable slider__item-active");
      });
    }
  },
  mounted() {
    const $vm = this;

    $(document).ready(() => {
      console.log("Slider script");

      $vm.$slides = $("#" + $vm.id).find(".slider__item");

      if (!$vm.$slides.length) {
        return;
      }

      $vm.count = $vm.$slides.length;

      $(".slider__arrow").click(function(event) {
        event.preventDefault();

        let $this = $(this);

        $vm.$activeSlide = $vm.$slides.filter(".slider__item-active");
        $vm.$prevSlide = $vm.$activeSlide.prev();
        $vm.$nextSlide = $vm.$activeSlide.next();
        $vm.$firstSlide = $vm.$slides.first();
        $vm.$lastSlide = $vm.$slides.last();

        if ($this.hasClass("slider__arrow-next")) {
          if ($vm.$nextSlide.index() >= 0) {
            $vm.moveSlide($vm.$nextSlide, "forward");
          } else {
            $vm.moveSlide($vm.$firstSlide, "forward");
          }
        } else if ($this.hasClass("slider__arrow-prev")) {
          if ($vm.$prevSlide.index() >= 0) {
            $vm.moveSlide($vm.$prevSlide, "backward");
          } else {
            $vm.moveSlide($vm.$lastSlide, "backward");
          }
        }
      });
    });
  }
};
</script>
