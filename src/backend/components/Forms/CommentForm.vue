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
    type='textarea',
    v-model='description',
    :val='$v.description',
    placeholder='Содержание'
  )
  InputEventElem(v-model='date', :val='$v.date', placeholder='Дата')
  ChangeEventElem(
    label='Опубликован',
    v-model='isPublished',
    :val='$v.isPublished',
    type='checkbox'
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
import ChangeEventElem from '@components/formElems/ChangeEventElem';

export default {
  name: 'CommentForm',
  components: {
    ItemForm,
    InputEventElem,
    ChangeEventElem,
  },
  mixins: [itemFormMixin],
  data() {
    return {
      dbPage: 'comment',
      author: this.item.author,
      position: this.item.position,
      description: this.item.description,
      date: this.item.date,
      isPublished: this.item.isPublished,
    };
  },
  validations: {
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
    date: {
      required,
    },
  },
  methods: {
    prepareData() {
      this.submitData = {
        author: this.author,
        position: this.position,
        description: this.description,
        date: this.date,
        isPublished: this.isPublished,
      };
    },
  },
};
</script>
