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

<style lang="scss" src="@frontStylesCmp/BottomWrapper/import.scss"></style>
