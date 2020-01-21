<template lang="pug">
  PageWrapper
    HeaderWrapper
      NavCmp
      HeaderContent
      ScrollButton
    router-view
    FooterWrapper
    MainMenu
</template>

<script>
import menuChecker from "@frontend/mixins/menuChecker";
import PageWrapper from "@frontCmp/PageWrapper";
import HeaderWrapper from "@frontCmp/Header/HeaderWrapper";
import NavCmp from "@frontCmp/NavCmp";
import HeaderContent from "@frontCmp/Header/HeaderContent";
import ScrollButton from "@frontCmp/ScrollButton";
import FooterWrapper from "@frontCmp/FooterWrapper";
import MainMenu from "@frontCmp/NavCmp/MainMenu";

export default {
  name: "SiteApp",
  components: {
    PageWrapper,
    HeaderWrapper,
    NavCmp,
    HeaderContent,
    ScrollButton,
    FooterWrapper,
    MainMenu
  },
  mixins: [menuChecker]
};
</script>
