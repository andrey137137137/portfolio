<template lang="pug">
  #bottomWrapper.section.bottom_wrap(:class="addClasses")
    slot
</template>

<script>
import addClassesMixin from "@common/mixins/addClassesMixin";

export default {
  name: "BottomWrapper",
  mixins: [addClassesMixin]
};
</script>

<style lang="scss">
@import "@frontStylesCmp/BottomWrapper/import";
</style>
