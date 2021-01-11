<template lang="pug">
a(href='#', :class='containerClasses', @click.prevent='handle')
  ImageList(
    :transitionName='transitionName',
    :isLoaded='isLoaded',
    :index='index',
    :path='imagePath',
    :breakpoints='imageBreakpoints',
    :alt='alt',
    :imgAddClasses='imgClasses'
  )
</template>

<script>
import ImageWrapper from '@frontCmp/ImageWrapper';
import ImageList from './ImageList';

export default {
  name: 'ArrowButton',
  components: {
    ImageList,
    ImageWrapper,
  },
  props: {
    isLoaded: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    handle: {
      type: Function,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    imageBreakpoints: {
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
        // 'img_wrap-img': true,
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
