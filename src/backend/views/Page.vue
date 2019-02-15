<template lang="pug">
  PageWrapper(:title="pageId")
    .icon
</template>

<script>
import PageWrapper from "@backCmp/PageWrapper";
import pageData from "@backend/mixins/pageData";

export default {
  name: "AdminPageView",
  components: {
    PageWrapper
  },
  mixins: [pageData],
  props: {
    pageId: String
  }
};
</script>

<style lang="scss" src="../styles/pages/Page.scss" scoped></style>
