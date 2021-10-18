<template lang="pug">
UserForm(:handleSubmit='submit', :disabled='disabled')
  InputEventElem(v-model='firstName', :val='$v.firstName', placeholder='Имя')
  InputEventElem(v-model='lastName', :val='$v.lastName', placeholder='Фамилия')
  MultipleElem(
    :vals='$v.contacts.$each.$iter',
    :items='contacts',
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

export default {
  name: 'ProfileForm',
  components: {
    UserForm,
    InputEventElem,
    MultipleElem,
  },
  mixins: [userFormMixin],
  data() {
    const data = {
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

    return {
      ...data,
      contacts: this.getMultipleArray(
        this.params,
        'contacts',
        data.contactTemplate,
      ),
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
          // alphaNum,
        },
        icon: {
          required,
          // alphaNum,
        },
      },
    },
  },
  methods: {
    prepareData() {
      this.submitData = {
        firstName: this.firstName,
        lastName: this.lastName,
        old: this.old,
        contacts: this.cloneMultipleArray(this.contacts, this.contactTemplate),
      };
    },
  },
};
</script>
