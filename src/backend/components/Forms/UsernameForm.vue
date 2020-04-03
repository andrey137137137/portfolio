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
    div(v-if="changePassword")
      InputEventElem(
        type="password"
        v-model="oldPassword"
        :val="$v.oldPassword"
        placeholder="Старый пароль")
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
      oldPassword: "",
      password: "",
      repPassword: ""
    };
  },
  validations() {
    const userValids = {
      email: {
        required,
        email
      },
      username: {
        required
      }
    };
    const passwordValids = {
      required,
      alphaNum,
      minLength: minLength(6),
      maxLength: maxLength(16)
    };
    const changePasswordValids = {
      oldPassword: passwordValids,
      password: passwordValids,
      repPassword: {
        sameAsPassword: sameAs("password")
      }
    };

    if (!this.changePassword) return userValids;

    return {
      ...userValids,
      ...changePasswordValids
    };
  },
  methods: {
    prepareData() {
      const { email, username, oldPassword, password, repPassword } = this;

      this.submitData = {
        email,
        username,
        oldPassword,
        password,
        repPassword
      };
    }
  }
};
</script>
