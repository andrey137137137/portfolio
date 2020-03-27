<template lang="pug">
  FormWrapper#login_form.login_form(
    action="/admin"
    :class="addClasses"
    @submit.prevent.native="handleSubmit")

    .login_form-top_wrap
      h2.section-title.section-title--uppercase.login_form-title Авторизуйтесь

      InputEventElem(
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
              .form-error(v-show="!$v.notRobot.required") form-error

    .menu.header-menu.header-menu--float.form-menu.login_form-menu
      //- li.menu-item.menu-item--for_main
      a#flip_2_front.menu-link.btn(href="#") На главную
      //- li.menu-item.menu-item--for_main
      input.menu-link.btn(type="submit", value="Войти")
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  alphaNum,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import axios from "axios";
// import { checked } from "@common/helpers/validators";
import addClasses from "@common/mixins/addClasses";
import FormWrapper from "@components/FormElems/FormWrapper";
import InputEventElem from "@components/FormElems/InputEventElem";
import ChangeEventElem from "@components/FormElems/ChangeEventElem";

import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("auth");

export default {
  name: "LoginForm",
  components: {
    FormWrapper,
    InputEventElem,
    ChangeEventElem
  },
  mixins: [validationMixin, addClasses],
  data() {
    return {
      username: "",
      password: "",
      isHuman: false,
      notRobot: ""
    };
  },
  validations: {
    username: {
      required,
      alphaNum,
      minLength: minLength(7)
    },
    password: {
      required,
      alphaNum,
      minLength: minLength(6),
      maxLength: maxLength(16)
    },
    isHuman: {
      // checked
    },
    notRobot: {
      // required
    }
  },
  methods: {
    ...mapActions(["setAuthStatus"]),
    handleSubmit() {
      if (this.$v.$invalid) return false;

      const $vm = this;
      const { username, password } = this;

      axios.post("user/auth", { username, password }).then(res => {
        if (res.data.success) {
          $vm.setAuthStatus(res.data.success);
          return $vm.$router.push("/admin");
        }

        return false;
      });
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/LoginForm/import.scss"></style>
