<template lang="pug">
  a(href="#" :class="classes" @click.prevent="handle")
    transition(:name="transitionName")
      .img_wrap.slider__item(:key="index")
        img.img_wrap__img(:src="imgSrc" :alt="index + 1")
        .slider__item_number.slider__arrow_number {{newIndex + 1}}
</template>

<script>
export default {
  name: "ArrowButton",
  props: {
    index: {
      type: Number,
      required: true
    },
    newIndex: {
      type: Number,
      required: true
    },
    handle: {
      type: Function,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    },
    isNext: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      return {
        icon: true,
        "icon-chevron_down": !this.isNext,
        "icon-chevron_up": this.isNext,
        slider__arrow: true,
        "slider__arrow-prev": !this.isNext,
        "slider__arrow-next": this.isNext
      };
    },
    transitionName() {
      const transitionMethod = this.isNext ? "scroll_up" : "scroll_down";
      return `slider__arrow-${transitionMethod}`;
    }
  }
};
</script>
