<template lang="pug">
  ItemForm(
    :handleSubmit="submit"
    :handleDelete="removeItem"
    :id="id"
    :disabled="disabled"
  )
    InputEventElem(
      v-model="title"
      :val="$v.title"
      placeholder="Название")
    InputEventElem(
      v-if="item"
      v-model="date"
      :val="$v.date"
      placeholder="Дата")
    InputEventElem(
      type="textarea"
      v-model="text"
      :val="$v.text"
      placeholder="Содержание")
</template>

<script>
// import { validationMixin } from "vuelidate";
import {
  required,
  // alphaNum,
  minLength,
  // maxLength
} from 'vuelidate/lib/validators';
// import formMixin from "@common/mixins/formMixin";
// import backFormMixin from "@backend/mixins/backFormMixin";
// import itemFormMixin from "@backend/mixins/itemFormMixin";
// import exist from "@common/helpers/exist";
import ItemForm from '@backCmp/forms/ItemForm';
import InputEventElem from '@components/formElems/InputEventElem';

export default {
  name: 'PostForm',
  components: {
    ItemForm,
    InputEventElem,
  },
  // mixins: [validationMixin, formMixin, backFormMixin, itemFormMixin],
  data() {
    const data = {
      dbPage: 'post',
    };

    if (!this.item) {
      return { ...data, ...this.defaultFields() };
    }

    // else {
    //   data.title = this.post.title;
    //   data.date = this.post.date;
    //   data.text = this.post.body;
    // }

    return {
      ...data,
      title: this.item.title,
      date: this.item.date,
      text: this.item.body,
    };
  },
  validations() {
    const data = {
      title: {
        required,
      },
      text: {
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
        title: '',
        text: '',
      };
    },
    prepareData() {
      const data = {
        // id: Math.round(Math.random() * 1000000),
        title: this.title,
        text: this.text,
      };

      if (this.item) {
        data.date = this.date;
      }

      this.submitData = data;
    },
  },
};
</script>
