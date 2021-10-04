<template lang="pug">
UserForm(:handleSubmit='submit', :disabled='disabled')
  InputEventElem(v-model='firstName', :val='$v.firstName', placeholder='Имя')
  InputEventElem(v-model='lastName', :val='$v.lastName', placeholder='Фамилия')
  MultipleElem(
    :vals='$v.copyContacts.$each.$iter',
    :items='copyContacts',
    :fields='contactFields',
    :propTemplate='contactTemplate'
  )
</template>

<script>
import {
  required,
  alphaNum,
  // minValue,
  // maxValue
} from 'vuelidate/lib/validators';
import userFormMixin from '@backend/mixins/userFormMixin';
import UserForm from '@backCmp/forms/UserForm';
import InputEventElem from '@components/formElems/InputEventElem';
import MultipleElem from '@components/formElems/MultipleElem';
// import { exist } from '@apiHelpers';

export default {
  name: 'ProfileForm',
  components: {
    UserForm,
    InputEventElem,
    MultipleElem,
  },
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
      copyContacts: [],
      isFirstUpdated: false,
    };
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    copyContacts: {
      $each: {
        name: {
          required,
          alphaNum,
        },
        href: {
          required,
          // alphaNum,
        },
        icon: {
          required,
          // alphaNum,
        },
      },
    },
  },
  computed: {
    compContacts() {
      return this.getMultipleArray(this, 'contacts', this.contactTemplate);
    },
  },
  methods: {
    prepareData() {
      this.submitData = {
        firstName: this.firstName,
        lastName: this.lastName,
        contacts: this.cloneMultipleArray(
          this.compContacts,
          this.contactTemplate,
        ),
      };
    },
  },
  updated() {
    if (!this.isFirstUpdated) {
      this.copyContacts = this.compContacts;
      this.isFirstUpdated = true;
    }
  },
};
</script>
