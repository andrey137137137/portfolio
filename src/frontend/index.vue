<template lang="pug">
  PageWrapper
    HeaderWrapper
      transition(name="fade")
        a.btn.btn--opacity.authorization(v-show="!isFlipped" href="#login" @click.prevent="fadeButton") Авторизоваться
      .container.header-container.header-container--framed(:class="flippedClass")
        .header-flip_wrap
          HeaderContent
          NavCmp
        LoginForm.header-flip_wrap.header-flip_wrap--back
    SubmitMessage
</template>

<script>
import flipChecker from "@frontend/mixins/flipChecker";
import PageWrapper from "@frontCmp/PageWrapper";
import HeaderWrapper from "@frontCmp/Header/HeaderWrapper";
import HeaderContent from "@frontCmp/Header/HeaderContent";
import NavCmp from "@frontCmp/NavCmp";
import LoginForm from "@frontCmp/Forms/LoginForm";
import SubmitMessage from "@components/FormElems/SubmitMessage";
import FooterWrapper from "@frontCmp/FooterWrapper";

export default {
  name: "Home",
  components: {
    PageWrapper,
    HeaderWrapper,
    HeaderContent,
    NavCmp,
    LoginForm,
    SubmitMessage,
    FooterWrapper
  },
  mixins: [flipChecker],
  computed: {
    flippedClass() {
      return { "header-container--flipped": this.isFlipped };
    }
  }
};
</script>

<style lang="scss">
@import "@frontStylesPgs/Home/import";
</style>

<style lang="scss">
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s;
  }

  &-enter, &-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }

  &-enter-to, &-leave /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 1;
  }
}
</style>
