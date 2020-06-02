<template lang="pug">
  svg(:class="addClasses")
    use(:xlink:href="svg.url")
</template>

<script>
import addClasses from "@common/mixins/addClasses";

export default {
  name: "SvgCmp",
  mixins: [addClasses],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      svg: null
    };
  },
  created() {
    this.svg = require(`@assets/svg/${this.id}.svg`);
    console.log(this.svg);
  }
};
</script>
