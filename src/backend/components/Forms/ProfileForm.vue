<template lang="pug">
  UserForm(
    :handleSubmit="submit"
    :disabled="disabled"
  )
    InputEventElem(
      v-model="firstName"
      :val="$v.firstName"
      placeholder="Имя")
    InputEventElem(
      v-model="lastName"
      :val="$v.lastName"
      placeholder="Фамилия")
    MultipleElem(
      :vals="$v.contacts.$each.$iter"
      :items="contacts"
      :fields="contactFields"
      :propTemplate="contactTemplate")
</template>

<script>
// import { validationMixin } from 'vuelidate';
import {
  required,
  alphaNum,
  // minValue,
  // maxValue
} from 'vuelidate/lib/validators';
// import backFormMixin from '@backend/mixins/backFormMixin';
import userFormMixin from '@backend/mixins/userFormMixin';
import UserForm from '@backCmp/forms/UserForm';
import InputEventElem from '@components/formElems/InputEventElem';
import MultipleElem from '@components/formElems/MultipleElem';

export default {
  name: 'ProfileForm',
  components: {
    UserForm,
    InputEventElem,
    MultipleElem,
  },
  // mixins: [validationMixin, backFormMixin, userFormMixin],
  mixins: [userFormMixin],
  data() {
    return {
      contactFields: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Контакт',
        },
        {
          name: 'href',
          type: 'text',
          placeholder: 'Значение',
        },
        {
          name: 'icon',
          type: 'text',
          placeholder: 'Иконка',
        },
      ],
      contactTemplate: {
        name: '',
        href: '',
        icon: '',
      },
    };
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    contacts: {
      $each: {
        name: {
          required,
          alphaNum,
        },
        href: {
          required,
          alphaNum,
        },
        icon: {
          required,
          alphaNum,
        },
      },
    },
  },
  methods: {
    prepareData() {
      this.submitData = {
        firstName: this.firstName,
        lastName: this.lastName,
        contacts: this.cloneMultipleArray(this.contacts, this.contactTemplate),
      };
    },
  },
};
</script>
