<template lang="pug">
a(href='#', :class='containerClasses', @click.prevent='handle')
  transition(:name='transitionName')
    ImageWrapper.img_wrap.slider-item(
      :key='index',
      :path='imagePath',
      :breakpoints='imgBreakpoints',
      :title='alt',
      :isLazyLoading='false',
      :addClasses='imgClasses'
    )
</template>

<script>
import ImageWrapper from '@frontCmp/ImageWrapper';

export default {
  name: 'ArrowButton',
  components: {
    ImageWrapper,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    newIndex: {
      type: Number,
      required: true,
    },
    handle: {
      type: Function,
      required: true,
    },
    imgPath: {
      type: String,
      required: true,
    },
    imgBreakpoints: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isNext: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      imgClasses: {
        'img_wrap-img': true,
        'slider-img': true,
        'slider-img--in_arrow': true,
      },
    };
  },
  computed: {
    containerClasses() {
      return {
        icon: true,
        'icon--chevron_down': !this.isNext,
        'icon--chevron_up': this.isNext,
        'slider-arrow': true,
        'slider-arrow--prev': !this.isNext,
        'slider-arrow--next': this.isNext,
      };
    },
    transitionName() {
      const transitionMethod = this.isNext ? 'scroll_up' : 'scroll_down';
      return `slider--${transitionMethod}`;
    },
    alt() {
      const number = this.newIndex + 1;
      return number + '. ' + this.title;
    },
  },
};
</script>
