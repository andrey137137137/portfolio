<template lang="pug">
  .main_wrap
    BodyTop
    HeaderWrapper
      NavCmp
      HeaderContent
      ScrollButton
    MainMenu
</template>

<script>
import menuChecker from "@frontend/mixins/menuChecker";
import BodyTop from "@frontCmp/BodyTop";
import HeaderWrapper from "@frontCmp/Header/HeaderWrapper";
import NavCmp from "@frontCmp/NavCmp";
import HeaderContent from "@frontCmp/Header/HeaderContent";
import ScrollButton from "@frontCmp/ScrollButton";
import FooterWrapper from "@frontCmp/FooterWrapper";
import MainMenu from "@frontCmp/NavCmp/MainMenu";

import { mapActions } from "vuex";

export default {
  name: "AboutView",
  components: {
    BodyTop,
    HeaderWrapper,
    NavCmp,
    HeaderContent,
    ScrollButton,
    FooterWrapper,
    MainMenu
  },
  mixins: [menuChecker],
  methods: {
    ...mapActions(["setConfig"])
  },
  created() {
    this.setConfig({
      name: "Обо мне",
      isContent: true,
      sections: 3
    });
  }
};
</script>
