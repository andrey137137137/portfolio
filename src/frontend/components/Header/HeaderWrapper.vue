<template lang="pug">
  header#header.section.header(:class="addClasses")
    slot
</template>

<script>
import addClasses from "@common/mixins/addClasses";

export default {
  name: "HeaderWrapper",
  mixins: [addClasses]
};
</script>

<style lang="scss" src="@frontStyles/cmp/HeaderWrapper.scss">
</style>
