<template lang="pug">
  div
    PageWrapper
      HeaderWrapper
        a.btn.btn--opacity.authorization(href="#login" ref="flipBtn" @click.prevent="fadeButton") Авторизоваться
        .container.header-container.header-container--framed(:class="flippedClass")
          .header-flip_wrap
            HeaderContent
            NavCmp
          FrontFormWrapper#login_form.header-flip_wrap.header-flip_wrap--back.login_form(
            action="/admin"
            @submit.prevent.native="handleSubmit")

            .login_form-top_wrap
              h2.section-title.section-title--uppercase.login_form-title Авторизуйтесь

              InputEventElem(
                wrapClass="icon_label"
                labelIcon="login"
                label="Пользователь"
                v-model="username"
                :val="$v.username"
                placeholder="Пользователь")

              InputEventElem(
                wrapClass="icon_label"
                labelIcon="password"
                label="Пароль"
                v-model="password"
                :val="$v.password"
                type="password"
                placeholder="Пароль")

              ChangeEventElem(
                label="Я человек"
                v-model="isHuman"
                :val="$v.isHuman"
                type="checkbox")

              legend.form-legend Вы точно не робот?

              .form-wrap.form-wrap--radio.login_form-radio_wrap
                .form-row.flex.flex--wrap
                  label.form-label.login_form-radio_yes
                    input.form-input(type="radio" value="yes" v-model="$v.notRobot.$model")
                    .form-checked
                    .form-checkbox_text Да
                  label.form-label
                    input.form-input(type="radio" value="no" v-model="$v.notRobot.$model")
                    .form-checked
                    .form-checkbox_text Не уверен
                  ErrorElem

            .menu.header-menu.header-menu--float.form-menu.login_form-menu
              a#flip_2_front.menu-link.btn(@click.prevent="fadeButton" href="#") На главную
              input.menu-link.btn(type="submit", value="Войти")
      SubmitMessage
    FooterWrapper
</template>

<script>
import $ from "jquery";
import axios from "axios";
import { validationMixin } from "vuelidate";
// import { required } from "vuelidate/lib/validators";
import { userAlphaNumValids, checked } from "@common/helpers/validators";
import { ERROR } from "@httpSt";
import form from "@common/mixins/form";
import PageWrapper from "@frontCmp/PageWrapper";
import HeaderWrapper from "@frontCmp/Header/HeaderWrapper";
import HeaderContent from "@frontCmp/Header/HeaderContent";
import NavCmp from "@frontCmp/NavCmp";
import FrontFormWrapper from "@frontCmp/FrontFormWrapper";
import ErrorElem from "@components/FormElems/ErrorElem";
import InputEventElem from "@components/FormElems/InputEventElem";
import ChangeEventElem from "@components/FormElems/ChangeEventElem";
import SubmitMessage from "@components/FormElems/SubmitMessage";
import FooterWrapper from "@frontCmp/FooterWrapper";

import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    PageWrapper,
    HeaderWrapper,
    HeaderContent,
    NavCmp,
    FrontFormWrapper,
    ErrorElem,
    InputEventElem,
    ChangeEventElem,
    SubmitMessage,
    FooterWrapper
  },
  mixins: [validationMixin, form],
  data() {
    return {
      isFlipped: false,
      username: "",
      password: "",
      isHuman: false,
      notRobot: ""
    };
  },
  validations: {
    username: userAlphaNumValids,
    password: userAlphaNumValids,
    isHuman: {
      checked
    },
    notRobot: {
      // required
    }
  },
  computed: {
    flippedClass() {
      return { "header-container--flipped": this.isFlipped };
    }
  },
  methods: {
    ...mapActions(["setAuthStatus", "setFormMessage"]),
    fadeButton() {
      const $flipBtn = $(this.$refs.flipBtn);
      this.isFlipped = !this.isFlipped;

      const FUNC = this.isFlipped ? "fadeOut" : "fadeIn";
      $flipBtn[FUNC]();
    },
    handleSubmit() {
      if (!this.touchInvalidElem()) return false;

      const $vm = this;
      const { username, password } = this;

      axios
        .post("user/auth", { username, password })
        .then(res => {
          if (res.data.success) {
            $vm.setAuthStatus(res.data.success);
            return $vm.$router.push("/admin");
          }

          return false;
        })
        .catch(err => {
          if (!err.response) {
            $vm.setFormMessage({ status: ERROR, message: "" });
            return;
          }

          const status = err.response.status;
          const message = err.response.data.message;
          $vm.setFormMessage({ status, message });
        });
    }
  }
};
</script>

<style lang="scss">
@import "@frontStylesPgs/Home/import";
@import "@frontStylesCmp/LoginForm/import";
</style>
