<template lang="pug">
UserForm(:handleSubmit='submit', :disabled='disabled')
  InputEventElem(v-model='email', :val='$v.email', placeholder='Email')
  InputEventElem(
    v-model='username',
    :val='$v.username',
    placeholder='Имя пользователя'
  )
  ChangeEventElem(
    label='Изменить пароль',
    v-model='changePassword',
    type='checkbox'
  )
  div(v-if='changePassword')
    InputEventElem(
      type='password',
      v-model='oldPassword',
      :val='$v.oldPassword',
      placeholder='Старый пароль'
    )
    InputEventElem(
      type='password',
      v-model='password',
      :val='$v.password',
      placeholder='Пароль'
    )
    InputEventElem(
      type='password',
      v-model='repPassword',
      :val='$v.repPassword',
      placeholder='Повторите пароль'
    )
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';
import { userAlphaNumValids } from '@common/helpers/validators';
import userFormMixin from '@backend/mixins/userFormMixin';
import UserForm from '@backCmp/forms/UserForm';
import InputEventElem from '@components/formElems/InputEventElem';
import ChangeEventElem from '@components/formElems/ChangeEventElem';

export default {
  name: 'UsernameForm',
  components: {
    UserForm,
    InputEventElem,
    ChangeEventElem,
  },
  mixins: [userFormMixin],
  data() {
    return {
      changePassword: false,
      oldPassword: '',
      password: '',
      repPassword: '',
    };
  },
  validations() {
    const userValids = {
      email: {
        required,
        email,
      },
      username: userAlphaNumValids,
    };
    const changePasswordValids = {
      oldPassword: userAlphaNumValids,
      password: userAlphaNumValids,
      repPassword: {
        sameAsPassword: sameAs('password'),
      },
    };

    if (!this.changePassword) return userValids;

    return {
      ...userValids,
      ...changePasswordValids,
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
        repPassword,
      };
    },
  },
  watch: {
    changePassword(newValue) {
      if (!newValue) {
        this.oldPassword = '';
        this.password = '';
        this.repPassword = '';
      }
    },
  },
};
</script>
