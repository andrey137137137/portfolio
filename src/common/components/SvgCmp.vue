<template lang="pug">
  svg(:class="addClasses")
    use(xlink:href="../../assets/svg/sprite.svg")
    //- v-bind:xlink:href=`../svg/symbol/svg/sprite.symbol.svg#${id}`
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
