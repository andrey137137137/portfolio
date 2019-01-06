<template lang="pug">
  div
    //- BodyTop
    HeaderWrapper(:addClasses="{'header-framed': true}")
      a#flip_2_back.btn.btn-opacity.authorization(href="#login") Авторизоваться
      #flip_container.container.header__container.header__container-framed
        .header__flip_wrap
          HeaderContent
          NavCmp
        LoginForm(:addClasses="formClasses")
    FooterWrapper(:isToUp="false")
</template>

<script>
import BodyTop from "@frontCmp/BodyTop";
import HeaderWrapper from "@frontCmp/Header/HeaderWrapper";
import HeaderContent from "@frontCmp/Header/HeaderContent";
import NavCmp from "@frontCmp/NavCmp";
import LoginForm from "@components/Forms/LoginForm";
import FooterWrapper from "@frontCmp/FooterWrapper";

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
