<template lang="pug">
  div
    BodyTop
    HeaderWrapper(:addClasses="{'header-framed': true}")
      #flip_container.container.header__container.header__container-framed
        .header__flip_wrap
          HeaderContent
          NavCmp
        LoginForm(:addClasses="formClasses")
    FooterWrapper(:isToUp="false")
</template>

<script>
import BodyTop from "@/components/BodyTop";
import HeaderWrapper from "@/components/Header/HeaderWrapper";
import HeaderContent from "@/components/Header/HeaderContent";
import NavCmp from "@/components/NavCmp";
import LoginForm from "@/components/Forms/LoginForm";
import FooterWrapper from "@/components/FooterWrapper";

export default {
  name: "Home",
  components: {
    BodyTop,
    HeaderWrapper,
    HeaderContent,
    NavCmp,
    LoginForm,
    FooterWrapper
  },
  props: {
    isBlog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formClasses: {
        header__flip_wrap: true,
        "header__flip_wrap-back": true
      }
    };
  }
};
</script>
