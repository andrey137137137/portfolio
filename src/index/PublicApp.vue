<template lang="pug">
  div
    //- PreloaderCmp
    ParallaxCmp(:addClasses="addClasses")
    router-view
</template>

<script>
import addClasses from "@/mixins/addClasses";
import PreloaderCmp from "@/components/BodyTop/PreloaderCmp";
import ParallaxCmp from "@/components/BodyTop/ParallaxCmp";

export default {
  name: "PublicApp",
  components: {
    PreloaderCmp,
    ParallaxCmp
  },
  mixins: [addClasses]
};
</script>

<style lang="scss" src="@/styles/app.scss">
</style>
