<template lang="pug">
  .section.bottom_wrap(:class="addClasses")
    slot
</template>

<script>
import addClasses from "@common/mixins/addClasses";

export default {
  name: "BottomWrapper",
  mixins: [addClasses]
};
</script>

<style lang="scss">
@import "@frontStylesCmp/BottomWrapper/import";
</style>
