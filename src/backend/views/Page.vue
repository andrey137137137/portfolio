<template lang="pug">
  div
    h1 this is page {{ pageId }}
    .icon
</template>

<script>
export default {
  name: "AdminPageView",
  props: {
    pageId: String
  }
};
</script>

<style lang="scss" src="../styles/pages/Page.scss" scoped></style>
