<template lang="pug">
  .main_wrap
    BodyTop
    HeaderWrapper
      NavCmp
      HeaderContent
      ScrollButton
    TopWrapper
    slot
    //- FooterWrapper
    MainMenu
</template>

<script>
import menuChecker from "@frontend/mixins/menuChecker";
import BodyTop from "@frontCmp/BodyTop";
import HeaderWrapper from "@frontCmp/Header/HeaderWrapper";
import NavCmp from "@frontCmp/NavCmp";
import HeaderContent from "@frontCmp/Header/HeaderContent";
import ScrollButton from "@frontCmp/ScrollButton";
import TopWrapper from "@frontCmp/TopWrapper";
import FooterWrapper from "@frontCmp/FooterWrapper";
import MainMenu from "@frontCmp/NavCmp/MainMenu";

export default {
  name: "PageWrapper",
  components: {
    BodyTop,
    HeaderWrapper,
    NavCmp,
    HeaderContent,
    ScrollButton,
    TopWrapper,
    FooterWrapper,
    MainMenu
  },
  mixins: [menuChecker]
};
</script>
