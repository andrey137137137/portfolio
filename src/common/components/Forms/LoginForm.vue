<template lang="pug">
  FormWrapper#login_form(
    :addClasses="containerClasses"
    @submit.prevent.native="handleSubmit")

    .login_form__top_wrap
      h2.section__title.section__title-uppercase.login_form__title Авторизуйтесь

      .form__wrap.form__wrap-text.form__wrap-icon_label
        .form__row.login_form__row
          label.form__label
          input.form__input.login_form__text_input
        .form__error_wrap
          .form__error form__error

      .form__wrap.form__wrap-text.form__wrap-icon_label
        .form__row.login_form__row
          label.form__label
          input.form__input.login_form__text_input(type="password", name="")
        .form__error_wrap
          .form__error form__error

      .form__wrap.form__wrap-checkbox
        label.form__label
          input.form__input(type="checkbox", name="login_form__checkbox")
          .form__checked
          .form__checkbox_text Я человек

      legend.form__legend.login_form__legend Вы точно не робот?

      .flex.flex-wrap.form__wrap.form__wrap-radio.login_form__radio_wrap
        label.form__label.login_form__radio_yes
          input.form__input(type="radio", name="login_form__radio")
          .form__checked
          .form__checkbox_text Да
        label.form__label
          input.form__input(type="radio", name="login_form__radio")
          .form__checked
          .form__checkbox_text Не уверен
        .form__error_wrap
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
import addClasses from "@/common/mixins/addClasses";
import FormWrapper from "@/common/components/FormElems/FormWrapper";

export default {
  name: "LoginForm",
  mixins: [addClasses],
  components: {
    FormWrapper
  },
  computed: {
    containerClasses() {
      return {
        login_form: true,
        ...this.addClasses
      };
    }
  }
};
</script>
