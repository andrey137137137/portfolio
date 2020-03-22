<template lang="pug">
  HeaderWrapper
    NavCmp
    HeaderContent
    ScrollButton
</template>

<script>
import HeaderWrapper from "@frontCmp/Header/HeaderWrapper";
import NavCmp from "@frontCmp/NavCmp";
import HeaderContent from "@frontCmp/Header/HeaderContent";
import ScrollButton from "@frontCmp/ScrollButton";

export default {
  name: "PageHeader",
  components: {
    HeaderWrapper,
    NavCmp,
    HeaderContent,
    ScrollButton
  }
};
</script>

<style lang="scss">
@import "@frontStylesCmp/Header/import.scss";
@import "@frontStylesCmp/SocialMenu/import.scss";
</style>
