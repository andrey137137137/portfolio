<template lang="pug">
  PageWrapper
    HeaderWrapper
      a#flip_2_back.btn.btn--opacity.authorization(href="#login" ref="flip_2_back" @click.prevent="fadeButton") Авторизоваться
      #flip_container.container.header-container.header-container--framed(:class="flippedClass")
        .header-flip_wrap
          HeaderContent
          NavCmp
        LoginForm.header-flip_wrap.header-flip_wrap--back
    SubmitMessage
</template>

<script>
import $ from "jquery";

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
  data() {
    return {
      // $flipBtn: null,
      // $container: null,
      isFlipped: false
      // btnHiddenClass: "authorization-hidden",
      // flippedClass: "header-container--flipped"
    };
  },
  computed: {
    flippedClass() {
      return { "header-container--flipped": this.isFlipped };
    }
  },
  methods: {
    fadeButton() {
      this.isFlipped = !this.isFlipped;

      if (this.isFlipped) $(this.$refs.flip_2_back).fadeOut();
      else $(this.$refs.flip_2_back).fadeIn();
    }
  }
  // mounted() {
  //   const $vm = this;

  //   $(document).ready(() => {
  //     $vm.$flipBtn = $("#flip_2_back");
  //     $vm.$container = $("#flip_container");

  //     $vm.$flipBtn.click(function(event) {
  //       event.preventDefault();

  //       $vm.$flipBtn.fadeOut();
  //       $vm.$container.addClass($vm.flippedClass);
  //     });

  //     $("#flip_2_front").click(function(event) {
  //       event.preventDefault();

  //       $vm.$container.removeClass($vm.flippedClass);
  //       $vm.$flipBtn.fadeIn();
  //     });
  //   });
  // }
};
</script>

<style lang="scss">
@import "@frontStylesPgs/Home/import";
</style>
