<template lang="pug">
  div
    //- PreloaderCmp
    ParallaxCmp(:addClasses="addClasses")
</template>

<script>
import addClasses from "@/mixins/addClasses";
import PreloaderCmp from "@/components/BodyTop/PreloaderCmp";
import ParallaxCmp from "@/components/BodyTop/ParallaxCmp";

export default {
  name: "BodyTop",
  components: {
    PreloaderCmp,
    ParallaxCmp
  },
  mixins: [addClasses]
};
</script>

<style lang="scss" src="@/styles/components/BodyTop.scss">
</style>
