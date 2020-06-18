<template lang="pug">
  FrontFormWrapper#feedback.section.container.container--full_width.feedback_form(
    @submit.prevent.native="handleSubmit")

    h2.section-title.section-title--uppercase.section-title--underlined.feedback_form-title Связаться со мной

    //- .form-row.form-row--text_wrap.feedback_form-row
    //-   input.form-input.feedback_form-text_input(type="text" name="name")

    InputEventElem(
      :addInputClasses="inputClasses"
      v-model="name"
      :val="$v.name"
      placeholder="Пользователь")

    //- .form-row.form-row--text_wrap.feedback_form-row
    //-   input.form-input.feedback_form-text_input(type="email" name="email")

    InputEventElem(
      :addInputClasses="inputClasses"
      type="email"
      v-model="email"
      :val="$v.email"
      placeholder="Почта")

    //- .form-row.form-row--textarea_wrap
    //-   textarea.form-input.feedback_form-text_input(name="message")

    InputEventElem(
      :addInputClasses="inputClasses"
      type="textarea"
      v-model="message"
      :val="$v.message"
      placeholder="Сообщение")

    .menu.form-menu.feedback_form-menu
      input.menu-link.btn(type="submit", value="Отправить")
      input.menu-link.btn.btn--full_opacity(type="reset" value="Очистить")
      //- li.menu-item
      //-   input.menu-link.btn(type="submit", value="Отправить")
      //- li.menu-item
      //-   input.menu-link.btn.btn--full_opacity(type="reset" value="Очистить")
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  alphaNum,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import FrontFormWrapper from "@frontCmp/FrontFormWrapper";
import InputEventElem from "@components/formElems/InputEventElem";

export default {
  name: "FeedbackForm",
  components: {
    FrontFormWrapper,
    InputEventElem
  },
  mixins: [validationMixin],
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
        "feedback_form-row": true
      };
    },
    inputClasses() {
      return {
        "feedback_form-text_input": true
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
