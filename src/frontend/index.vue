<template lang="pug">
  PageWrapper
    HeaderWrapper
      a#flip_2_back.btn.btn--opacity.authorization(href="#login") Авторизоваться
      #flip_container.container.header-container.header-container--framed
        .header-flip_wrap
          HeaderContent
          NavCmp
        LoginForm(:addClasses="formClasses")
</template>

<script>
import $ from "jQuery";

import PageWrapper from "@frontCmp/PageWrapper";
import HeaderWrapper from "@frontCmp/Header/HeaderWrapper";
import HeaderContent from "@frontCmp/Header/HeaderContent";
import NavCmp from "@frontCmp/NavCmp";
import LoginForm from "@frontCmp/Forms/LoginForm";
import FooterWrapper from "@frontCmp/FooterWrapper";

// import { createNamespacedHelpers } from "vuex";
// const { mapActions } = createNamespacedHelpers("frontView");

export default {
  name: "Home",
  components: {
    PageWrapper,
    HeaderWrapper,
    HeaderContent,
    NavCmp,
    LoginForm,
    FooterWrapper
  },
  data() {
    return {
      $flipBtn: null,
      $container: null,
      // btnHiddenClass: "authorization-hidden",
      flippedClass: "header-container--flipped",
      formClasses: {
        "header-flip_wrap": true,
        "header-flip_wrap--back": true
      }
    };
  },
  // methods: {
  //   ...mapActions(["setConfig"])
  // },
  // created() {
  //   this.setConfig({
  //     name: "Главная"
  //   });
  // },
  mounted() {
    const $vm = this;

    $(document).ready(() => {
      $vm.$flipBtn = $("#flip_2_back");
      $vm.$container = $("#flip_container");

      $vm.$flipBtn.click(function(event) {
        event.preventDefault();

        $vm.$flipBtn.fadeOut();
        $vm.$container.addClass($vm.flippedClass);
      });

      $("#flip_2_front").click(function(event) {
        event.preventDefault();

        $vm.$container.removeClass($vm.flippedClass);
        $vm.$flipBtn.fadeIn();
      });
    });
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Home/import.scss"></style>
