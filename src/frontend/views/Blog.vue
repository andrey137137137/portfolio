<template lang="pug">
  .main_wrap
    BodyTop
    HeaderWrapper
      NavCmp
      HeaderContent
      ScrollButton
    TopWrapper
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

import { mapActions } from "vuex";

export default {
  name: "BlogView",
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
  mixins: [menuChecker],
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
