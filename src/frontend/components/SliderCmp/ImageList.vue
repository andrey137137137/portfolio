<template lang="pug">
transition(:name='transitionName')
  .slider-item(:class='containerClasses', :key='index')
    ImageWrapper.img_wrap(
      v-for='(item, number) in 3',
      :key='number',
      :path='path',
      :breakpoints='breakpoints',
      :title='alt',
      :isLazyLoading='false',
      :imgAddClasses='imgAddClasses'
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
    transitionName: {
      type: String,
      required: true,
    },
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
    path: {
      type: String,
      required: true,
    },
    breakpoints: {
      type: Array,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    imgAddClasses: {
      type: Object,
      required: true,
    },
    isDemoSlide: {
      type: Boolean,
      default: false,
    },
    isNext: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    containerClasses() {
      return {
        'slider-demo_item': this.isDemoSlide,
      };
    },
  },
};
</script>
