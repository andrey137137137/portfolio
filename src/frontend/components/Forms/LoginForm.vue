<template lang="pug">
  FormWrapper#login_form(
    :addClasses="containerClasses"
    @submit.prevent.native="handleSubmit")

    .login_form__top_wrap
      h2.section__title.section__title-uppercase.login_form__title Авторизуйтесь

      InputEventElem(
        wrapClass="icon_label"
        label="Пользователь"
        v-model="name"
        :val="$v.name"
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

      legend.form__legend Вы точно не робот?

      .form__wrap.form__wrap-radio.login_form__radio_wrap
        .form__row.flex.flex-wrap
          label.form__label.login_form__radio_yes
            input.form__input(type="radio" value="yes" v-model="$v.notRobot.$model")
            .form__checked
            .form__checkbox_text Да
          label.form__label
            input.form__input(type="radio" value="no" v-model="$v.notRobot.$model")
            .form__checked
            .form__checkbox_text Не уверен
        .form__error_wrap(v-show="!$v.notRobot.required")
          .form__error form__error

    .menu.header__menu.header__menu-float.form__menu.login_form__menu
      a#flip_2_front.menu__link.btn(href="index.html") На главную
      input.menu__link.btn(type="submit", value="Войти")
      //- li.menu__item.menu__item-for_main
      //-   a#flip_2_front.menu__link.btn(href="index.html") На главную
      //- li.menu__item.menu__item-for_main
      //-   input.menu__link.btn(type="submit", value="Войти")
</template>

<script>
import {
  required,
  alphaNum,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import { checked } from "@common/helpers/validators";
import addClasses from "@common/mixins/addClasses";
import FormWrapper from "@components/FormElems/FormWrapper";
import InputEventElem from "@components/FormElems/InputEventElem";
import ChangeEventElem from "@components/FormElems/ChangeEventElem";

export default {
  name: "LoginForm",
  mixins: [addClasses],
  components: {
    FormWrapper,
    InputEventElem,
    ChangeEventElem
  },
  data() {
    return {
      name: "",
      password: "",
      isHuman: false,
      notRobot: ""
    };
  },
  computed: {
    containerClasses() {
      return {
        login_form: true,
        ...this.addClasses
      };
    }
  },
  validations: {
    name: {
      required,
      alphaNum,
      minLength: minLength(7)
    },
    password: {
      required,
      alphaNum,
      minLength: minLength(7),
      maxLength: maxLength(15)
    },
    isHuman: {
      checked
    },
    notRobot: {
      required
    }
  }
};
</script>
