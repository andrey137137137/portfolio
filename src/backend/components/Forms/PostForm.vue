<template lang="pug">
  ItemForm(
    :handleSubmit="submit"
    :handleDelete="removePost"
    :id="getId()"
    :disabled="$v.$pending || $v.$invalid"
  )
    InputEventElem(
      v-model="title"
      :val="$v.title"
      placeholder="Название")
    InputEventElem(
      v-if="post"
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
import {
  required,
  // alphaNum,
  minLength
  // maxLength
} from "vuelidate/lib/validators";

// import exist from "@common/helpers/exist";
import ItemForm from "@backCmp/Forms/ItemForm";
import InputEventElem from "@components/FormElems/InputEventElem";

import { mapActions } from "vuex";

export default {
  name: "PostForm",
  components: {
    ItemForm,
    InputEventElem
  },
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  data() {
    const data = {
      dbPage: "post"
    };

    if (!this.post) {
      data.title = "";
      data.text = "";
    } else {
      data.title = this.post.title;
      data.date = this.post.date;
      data.text = this.post.body;
    }

    return data;
  },
  validations() {
    const data = {
      title: {
        required
      },
      text: {
        required,
        minLength: minLength(71)
      }
    };

    if (this.post) {
      data.date = {
        required
      };
    }

    return data;
  },
  methods: {
    ...mapActions(["deleteData", "updateData", "insertData"]),
    getId() {
      return this.post ? this.post._id : 0;
    },
    removePost(id) {
      console.log(id);

      if (
        confirm(`Вы уверены, что хотите удалить пост: "${this.post.title}"?`)
      ) {
        this.deleteData(id);
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

      if (!this.post) {
        this.insertData({ dbPage: this.dbPage, data });
      } else {
        data.date = this.date;
        this.updateData({ dbPage: this.dbPage, id: this.post._id, data });
      }

      return true;
    }
  }
};
</script>
