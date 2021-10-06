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
      contacts: [],
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
  computed: {
    compContacts() {
      return this.getMultipleArray(
        this.params,
        'contacts',
        this.contactTemplate,
      );
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
  mounted() {
    this.contacts = this.compContacts;
  },
  updated() {
    this.contacts = this.compContacts;
  },
};
</script>
