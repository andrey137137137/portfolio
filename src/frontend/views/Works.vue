<template lang="pug">
  FullPageWrapper
    TopWrapper
</template>

<script>
import pageConfig from "@frontend/mixins/pageConfig";
import FullPageWrapper from "@frontCmp/FullPageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";

export default {
  name: "WorksView",
  components: {
    FullPageWrapper,
    TopWrapper
  },
  mixins: [pageConfig],
  data() {
    return {
      dbPage: "works",
      configParams: {
        name: "Мои работы",
        isTopWrapTitle: true,
        isContent: true,
        sections: 3
      }
    };
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Works.scss">
</style>
