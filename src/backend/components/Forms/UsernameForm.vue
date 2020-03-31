<template lang="pug">
  UserForm(
    :handleSubmit="submit"
    :disabled="disabled"
  )
    InputEventElem(
      v-model="email"
      :val="$v.email"
      placeholder="Email")
    InputEventElem(
      v-model="username"
      :val="$v.username"
      placeholder="Имя пользователя")
    ChangeEventElem(
      label="Изменить пароль"
      v-model="changePassword"
      type="checkbox")
    div(v-show="changePassword")
    InputEventElem(
      type="password"
      v-model="password"
      :val="$v.password"
      placeholder="Пароль")
    InputEventElem(
      type="password"
      v-model="repPassword"
      :val="$v.repPassword"
      placeholder="Повторите пароль")
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  alphaNum,
  email,
  sameAs,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import formMxn from "@backend/mixins/form";
import userFormMxn from "@backend/mixins/userForm";
import UserForm from "@backCmp/Forms/UserForm";
import InputEventElem from "@components/FormElems/InputEventElem";
import ChangeEventElem from "@components/FormElems/ChangeEventElem";

export default {
  name: "UsernameForm",
  components: {
    UserForm,
    InputEventElem,
    ChangeEventElem
  },
  mixins: [validationMixin, formMxn, userFormMxn],
  data() {
    return {
      changePassword: false,
      password: "",
      repPassword: ""
    };
  },
  validations() {
    const userVals = {
      email: {
        required,
        email
      },
      username: {
        required
      }
    };
    const passwordVals = {
      password: {
        required,
        alphaNum,
        minLength: minLength(6),
        maxLength: maxLength(16)
      },
      repPassword: {
        sameAsPassword: sameAs("password")
      }
    };

    if (!this.changePassword) return userVals;

    return {
      ...userVals,
      ...passwordVals
    };
  },
  methods: {
    prepareData() {
      this.submitData = {
        username: this.username,
        password: this.password,
        email: this.email
      };
    }
  }
};
</script>
