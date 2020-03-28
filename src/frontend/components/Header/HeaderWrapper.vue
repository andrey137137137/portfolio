<template lang="pug">
  header#header.section.header(:class="classes")
    slot
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "HeaderWrapper",
  computed: {
    ...mapGetters(["config"]),
    classes() {
      return {
        "header--framed": !this.config.isContent,
        "header--wide": this.config.isContent,
        "header--blog": this.config.isBlog
      };
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/HeaderWrapper/import.scss"></style>
