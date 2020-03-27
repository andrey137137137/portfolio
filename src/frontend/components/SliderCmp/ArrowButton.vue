<template lang="pug">
  a(href="#" :class="classes" @click.prevent="handle")
    transition(:name="transitionName")
      .img_wrap.slider-item(:key="index")
        img.img_wrap-img(:src="imgSrc" :alt="index + 1")
        .slider-item_number.slider-arrow_number {{newIndex + 1}}
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
        "icon--chevron_down": !this.isNext,
        "icon--chevron_up": this.isNext,
        "slider-arrow": true,
        "slider-arrow--prev": !this.isNext,
        "slider-arrow--next": this.isNext
      };
    },
    transitionName() {
      const transitionMethod = this.isNext ? "scroll_up" : "scroll_down";
      return `slider-arrow--${transitionMethod}`;
    }
  }
};
</script>
