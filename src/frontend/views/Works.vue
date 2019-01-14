<template lang="pug">
  .main_wrap
    BodyTop
    HeaderWrapper
      NavCmp
      HeaderContent
      ScrollButton
    TopWrapper(:title="config.name")
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

import { mapGetters, mapActions } from "vuex";

export default {
  name: "WorksView",
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
  computed: {
    ...mapGetters(["config"])
  },
  methods: {
    ...mapActions(["setConfig"])
  },
  created() {
    this.setConfig({
      name: "Мои работы",
      isContent: true,
      sections: 3
    });
  }
};
</script>
