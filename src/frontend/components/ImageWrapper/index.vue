<template lang="pug">
  picture(:class="containerClasses")
    ImageCmp(
      v-for="(item, index) in breakpoints"
      :key="index"
      :classes="imgClasses"
      :path="path + '/' + item.name"
      :breakpoint="item.value"
      :title="title")
</template>

<script>
import addClassesMixin from '@common/mixins/addClassesMixin.js';
import ImageCmp from './ImageCmp';

export default {
  name: 'ImageWrapper',
  components: {
    ImageCmp,
  },
  mixins: [addClassesMixin],
  props: {
    path: {
      type: String,
      required: true,
    },
    breakpoints: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isWrapperClass: {
      type: Boolean,
      default: true,
    },
    imgAddClasses: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    containerClasses() {
      return {
        img_wrap: this.isWrapperClass,
        ...this.addClasses,
      };
    },
    imgClasses() {
      return {
        'img_wrap-img': this.isWrapperClass,
        ...this.imgAddClasses,
      };
    },
  },
};
</script>
