<template lang="pug">
ItemForm(
  :handleSubmit='submit',
  :handleDelete='removeItem',
  :id='id',
  :disabled='disabled'
)
  InputEventElem(v-model='author', :val='$v.author', placeholder='Название')
  InputEventElem(
    v-model='position',
    :val='$v.position',
    placeholder='Должность'
  )
  InputEventElem(
    v-if='item',
    v-model='date',
    :val='$v.date',
    placeholder='Дата'
  )
  InputEventElem(
    type='textarea',
    v-model='description',
    :val='$v.description',
    placeholder='Содержание'
  )
</template>

<script>
import {
  required,
  // alphaNum,
  minLength,
  // maxLength
} from 'vuelidate/lib/validators';
import itemFormMixin from '@backend/mixins/itemFormMixin';
import ItemForm from '@backCmp/forms/ItemForm';
import InputEventElem from '@components/formElems/InputEventElem';

export default {
  name: 'CommentForm',
  components: {
    ItemForm,
    InputEventElem,
  },
  mixins: [itemFormMixin],
  data() {
    const data = {
      dbPage: 'post',
    };

    if (!this.item) {
      return { ...data, ...this.defaultFields() };
    }

    return {
      ...data,
      author: this.item.author,
      position: this.item.position,
      date: this.item.date,
      description: this.item.description,
    };
  },
  validations() {
    const data = {
      author: {
        required,
      },
      position: {
        required,
      },
      description: {
        required,
        minLength: minLength(71),
      },
    };

    if (this.item) {
      data.date = {
        required,
      };
    }

    return data;
  },
  methods: {
    defaultFields() {
      return {
        author: '',
        position: '',
        description: '',
      };
    },
    prepareData() {
      const data = {
        author: this.author,
        position: this.position,
        description: this.description,
      };

      if (this.item) {
        data.date = this.date;
      }

      this.submitData = data;
    },
  },
};
</script>
