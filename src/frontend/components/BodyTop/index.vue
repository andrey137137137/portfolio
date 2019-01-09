<template lang="pug">
  div
    //- PreloaderCmp
    ParallaxCmp
</template>

<script>
import PreloaderCmp from "./PreloaderCmp";
import ParallaxCmp from "./ParallaxCmp";

export default {
  name: "BodyTop",
  components: {
    PreloaderCmp,
    ParallaxCmp
  }
};
</script>
