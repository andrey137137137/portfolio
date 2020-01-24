<template lang="pug">
  a(href="#" :class="classes" @click.prevent="handle")
    transition(:name="transitionName")
      .img_wrap.slider__item(:key="index")
        img.img_wrap__img(src="newImg" :alt="index + 1")
        .slider__item_number.slider__arrow_number {{this.newIndex + 1}}
</template>

<script>
export default {
  name: "ArrowButton",
  props: {
    slides: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    handle: {
      type: Function,
      required: true
    },
    isNext: {
      type: Boolean,
      default: true
    }
  },
  // data() {
  //   return {
  //     index: 0
  //   };
  // },
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
    },
    newIndex() {
      if (this.isNext) {
        return (this.index + 1) % this.slides.length;
      }

      const tempIndex = this.index - 1;

      if (tempIndex < 0) {
        return this.slides.length - 1;
      }

      return tempIndex;
    },
    newImg() {
      return "/upload/slider/" + this.slides[this.newIndex].image;
    }
  }
  // methods: {
  //   handle() {
  //     this.index = this.newIndex;

  //     if (this.isNext) {
  //       this.$emit("transition-method", "scroll_up");
  //     } else {
  //       this.$emit("transition-method", "scroll_down");
  //     }
  //   }
  // }
};
</script>
