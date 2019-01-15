<template lang="pug">
  section.section(:id="name" :class="name")
    .container(:class="containerClasses")
      slot
</template>

<script>
export default {
  name: "SectionWrapper",
  props: {
    name: {
      type: String,
      required: true
    },
    isFullWidth: {
      type: Boolean,
      default: false
    },
    isOwnContainerClass: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    containerClasses() {
      return {
        "container-full_width": this.isFullWidth,
        [`${this.name}__container`]: this.isOwnContainerClass
      };
    }
  }
};
</script>
