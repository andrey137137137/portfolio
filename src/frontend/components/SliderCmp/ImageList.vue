<template lang="pug">
transition(appear, :name='transitionName')
  .slider-item(:class='containerClasses', :key='index')
    ImageWrapper(
      v-for='(item, number) in 3',
      :key='number',
      :path='path',
      :breakpoints='getFullBreakpoints(number)',
      :title='alt',
      :isLazyLoading='false',
      :addClasses='imgWrapClasses(number)',
      :imgAddClasses='imgAddClasses'
    )
    //- v-show='isLoaded',
</template>

<script>
import { getSlideImageName } from '@apiHelpers';
import ImageWrapper from '@frontCmp/ImageWrapper';

export default {
  name: 'ImageList',
  components: {
    ImageWrapper,
  },
  props: {
    transitionName: {
      type: String,
      required: true,
    },
    isLoaded: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
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
    imageFullNames: {
      type: Object,
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
  methods: {
    imgWrapClasses(number) {
      return {
        'slider-img_wrap': true,
        'slider-img_wrap--side': number == 0 || number == 2,
        'slider-img_wrap--center': number == 1,
      };
    },
    getFullBreakpoints(index) {
      const { id, imageNames } = this.imageFullNames;

      return this.breakpoints.map(breakpoint => {
        const { name, value } = breakpoint;
        console.log(name);
        return {
          name:
            name +
            (imageNames[index] ? getSlideImageName(id, imageNames[index]) : ''),
          value,
        };
      });
    },
  },
};
</script>
