<template lang="pug">
  picture(:class="classes")
    ImageCmp(
      v-for="(item, index) in breakpoints"
      :key="index"
      :path="path + '/' + item.name"
      :breakpoint="item.value"
      :title="item.title")
</template>

<script>
import addClassesMixin from "@common/mixins/addClassesMixin.js";
import ImageCmp from "./ImageCmp";

export default {
  name: "ImageWrapper",
  components: {
    ImageCmp
  },
  mixins: [addClassesMixin],
  props: {
    path: {
      type: String,
      required: true
    },
    breakpoints: {
      type: Array,
      required: true
    }
  },
  computed: {
    classes() {
      return {
        img_wrap: true,
        ...this.addClasses
      };
    }
  }
};
</script>
