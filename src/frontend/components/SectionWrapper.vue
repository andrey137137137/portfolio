<template lang="pug">
  section.section(:id="name" :class="name")
    div(:class="containerClasses")
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
    isContainerClass: {
      type: Boolean,
      default: true
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
        container: this.isContainerClass,
        "container--full_width": this.isContainerClass && this.isFullWidth,
        [`${this.name}-container`]: this.isOwnContainerClass
      };
    }
  }
};
</script>
