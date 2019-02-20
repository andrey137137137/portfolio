<template lang="pug">
  ItemForm(
    :handleSubmit="submit"
    :isNew="isNew"
    :disabled="$v.$pending || $v.$invalid"
  )
    InputEventElem(
      v-model="title"
      :val="$v.title"
      placeholder="Название")
    InputEventElem(
      v-model="link"
      :val="$v.link"
      placeholder="Ссылка")
    div(v-for="(v, index) in $v.techs.$each.$iter")
      //- .form-group(:class="{ 'form-group--error': v.$error }")
      //-   label.form__label Name for {{ index }}
      //-   input.form__input(v-model.trim="v.name.$model")
      //- .error(v-if="!v.name.required") Name is required.
      //- .error(v-if="!v.name.minLength")
      //-   | Name must have at least {{ v.name.$params.minLength.min }} letters.
      InputEventElem(
        v-model="v.name.$model"
        :val="v.name"
        :placeholder="`Технология ${getIndex(index)}`")
    div
      button.button(@click="techs.push({name: ''})") Add
      button.button(@click="techs.pop()") Remove
</template>

<script>
import {
  required
  // alphaNum,
  // minLength,
  // maxLength
} from "vuelidate/lib/validators";

import ItemForm from "@backCmp/Forms/ItemForm";
import InputEventElem from "@components/FormElems/InputEventElem";

import { mapActions } from "vuex";

export default {
  name: "SlideForm",
  components: {
    ItemForm,
    InputEventElem
  },
  props: {
    isNew: {
      type: Boolean,
      default: false
    },
    slide: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    if (this.isNew) {
      return {
        title: "",
        link: "",
        techs: [
          {
            name: "Html"
          },
          {
            name: "Css"
          },
          {
            name: "JavaScript"
          }
        ]
      };
    }

    return {
      title: this.slide.title,
      link: this.slide.link,
      techs: this.slide.techs
    };
  },
  validations: {
    title: {
      required
    },
    link: {
      required
    },
    techs: {
      required,
      $each: {
        name: {
          required
        }
      }
    }
  },
  methods: {
    ...mapActions(["deletePost", "updatePost", "createPost"]),
    getIndex(index) {
      return parseInt(index) + 1;
    },
    removePost(postId) {
      console.log(postId);

      if (confirm(`Вы уверены, что хотите удалить пост ${postId}?`)) {
        this.deletePost(postId);
      }
    },
    submit() {
      if (this.$v.$invalid) {
        return false;
      }

      const data = {
        // id: Math.round(Math.random() * 1000000),
        title: this.title,
        text: this.text
      };

      if (this.isNew) {
        this.createPost(data);
      } else {
        data.date = this.date;
        this.updatePost({ id: this.slide._id, data });
      }

      return true;
    }
  }
};
</script>
