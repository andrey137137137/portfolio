<template lang="pug">
  PageWrapper
    TopWrapper
</template>

<script>
import PageWrapper from "@frontCmp/PageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";

import { mapActions } from "vuex";

export default {
  name: "WorksView",
  components: {
    PageWrapper,
    TopWrapper
  },
  methods: {
    ...mapActions(["setConfig"])
  },
  created() {
    this.setConfig({
      name: "Мои работы",
      isTopWrapTitle: true,
      isContent: true,
      sections: 3
    });
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Works.scss">
</style>
