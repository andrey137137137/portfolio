<template lang="pug">
  div
    PreloaderCmp
    ParallaxCmp(:addClasses="addClasses")
</template>

<script>
import addClasses from "@/common/mixins/addClasses";
import PreloaderCmp from "./PreloaderCmp";
import ParallaxCmp from "./ParallaxCmp";

export default {
  name: "BodyTop",
  components: {
    PreloaderCmp,
    ParallaxCmp
  },
  mixins: [addClasses]
};
</script>
