<template lang="pug">
  .main_wrap
    BodyTop
    HeaderWrapper
      NavCmp
      HeaderContent
      ScrollButton
</template>

<script>
import BodyTop from "@frontCmp/BodyTop";
import HeaderWrapper from "@frontCmp/Header/HeaderWrapper";
import NavCmp from "@frontCmp/NavCmp";
import HeaderContent from "@frontCmp/Header/HeaderContent";
import ScrollButton from "@frontCmp/ScrollButton";
import FooterWrapper from "@frontCmp/FooterWrapper";

import { mapActions } from "vuex";

export default {
  name: "AboutView",
  components: {
    BodyTop,
    HeaderWrapper,
    NavCmp,
    HeaderContent,
    ScrollButton,
    FooterWrapper
  },
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
