<template lang="pug">
  PageWrapper
    TopWrapper
</template>

<script>
import PageWrapper from "@frontCmp/PageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";

import { mapActions } from "vuex";

export default {
  name: "BlogView",
  components: {
    PageWrapper,
    TopWrapper
  },
  methods: {
    ...mapActions(["setConfig"])
  },
  created() {
    this.setConfig({
      name: "Блог",
      isBlog: true,
      isContent: true,
      sections: 2
    });
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Blog.scss">
</style>
