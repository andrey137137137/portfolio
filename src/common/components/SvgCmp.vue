<template lang="pug">
  svg(:class="addClasses")
    use(:xlink:href="`#${id}`")
</template>

<script>
import addClasses from "@/common/mixins/addClasses";

export default {
  name: "SvgCmp",
  mixins: [addClasses],
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>
