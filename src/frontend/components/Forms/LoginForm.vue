<template lang="pug">
  FrontFormWrapper#login_form.login_form(
    action="/admin"
    @submit.prevent.native="handleSubmit")

    .login_form-top_wrap
      h2.section-title.section-title--uppercase.login_form-title Авторизуйтесь

      InputEventElem(
        @click="console.log('ljfslkdsjfl')"
        wrapClass="icon_label"
        label="Пользователь"
        v-model="username"
        :val="$v.username"
        placeholder="Пользователь")

      InputEventElem(
        wrapClass="icon_label"
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
          .form-error_wrap
            transition(name="fade")
              .form-error(v-if="error") {{error}}

    .menu.header-menu.header-menu--float.form-menu.login_form-menu
      a#flip_2_front.menu-link.btn(href="#") На главную
      input.menu-link.btn(type="submit", value="Войти")
</template>

<script>
import { validationMixin } from "vuelidate";
// import { required } from "vuelidate/lib/validators";
import axios from "axios";
import { userAlphaNumValids, checked } from "@common/helpers/validators";
import form from "@common/mixins/form";
import FrontFormWrapper from "@frontCmp/FrontFormWrapper";
import InputEventElem from "@components/FormElems/InputEventElem";
import ChangeEventElem from "@components/FormElems/ChangeEventElem";

import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("auth");

export default {
  name: "LoginForm",
  components: {
    FrontFormWrapper,
    InputEventElem,
    ChangeEventElem
  },
  mixins: [validationMixin, form],
  data() {
    return {
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
  methods: {
    ...mapActions(["setAuthStatus"]),
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
          const { data, status } = err.response;
          this.setError(status, data.message);
        });
    }
  }
};
</script>

<style lang="scss">
@import "@frontStylesCmp/LoginForm/import.scss";
</style>
