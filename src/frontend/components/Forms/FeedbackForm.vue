<template lang="pug">
  FormWrapper#feedback.section.container.container-full_width.feedback_form(
    @submit.prevent.native="handleSubmit")

    h2.section__title.section__title-uppercase.section__title-underlined.feedback_form__title Связаться со мной

    //- .form__row.form__row-text_wrap.feedback_form__row
    //-   input.form__input.feedback_form__text_input(type="text" name="name")

    InputEventElem(
      :addInputClasses="inputClasses"
      v-model="name"
      :val="$v.name"
      placeholder="Пользователь")

    //- .form__row.form__row-text_wrap.feedback_form__row
    //-   input.form__input.feedback_form__text_input(type="email" name="email")

    InputEventElem(
      :addInputClasses="inputClasses"
      type="email"
      v-model="email"
      :val="$v.email"
      placeholder="Почта")

    //- .form__row.form__row-textarea_wrap
    //-   textarea.form__input.feedback_form__text_input(name="message")

    InputEventElem(
      :addInputClasses="inputClasses"
      type="textarea"
      v-model="message"
      :val="$v.message"
      placeholder="Сообщение")

    .menu.form__menu.feedback_form__menu
      input.menu__link.btn(type="submit", value="Отправить")
      input.menu__link.btn.btn-full_opacity(type="reset" value="Очистить")
      //- li.menu__item
      //-   input.menu__link.btn(type="submit", value="Отправить")
      //- li.menu__item
      //-   input.menu__link.btn.btn-full_opacity(type="reset" value="Очистить")
</template>

<script>
import {
  required,
  alphaNum,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import FormWrapper from "@components/FormElems/FormWrapper";
import InputEventElem from "@components/FormElems/InputEventElem";

export default {
  name: "FeedbackForm",
  components: {
    FormWrapper,
    InputEventElem
  },
  data() {
    return {
      name: "",
      email: "",
      message: ""
    };
  },
  computed: {
    containerClasses() {
      return {
        feedback_form: true
      };
    },
    inputWrapClasses() {
      return {
        feedback_form__row: true
      };
    },
    inputClasses() {
      return {
        feedback_form__text_input: true
      };
    }
  },
  validations: {
    name: {
      required,
      alphaNum
    },
    email: {
      required,
      email
    },
    message: {
      required,
      minLength: minLength(27),
      maxLength: maxLength(527)
    }
  }
};
</script>
