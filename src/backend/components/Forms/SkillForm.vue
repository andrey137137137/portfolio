<template lang="pug">
  ItemForm(
    :handleSubmit="submit"
    :handleDelete="removeSlide"
    :id="getId()"
    :disabled="$v.$pending || $v.$invalid"
  )
    InputEventElem(
      v-model="category"
      :val="$v.category"
      placeholder="Навык")
    div(v-for="(v, index) in $v.items.$each.$iter")
      .form__legend Обновить навык
      InputEventElem(
        v-model="v.name.$model"
        :val="v.name"
        :placeholder="`Навык ${getIndex(index)}`")
      InputEventElem(
        type="number"
        v-model="v.percents.$model"
        :val="v.percents"
        :placeholder="`Владение ${getIndex(index)}`"
        measure="%")
    .menu
      button.btn(@click="items.pop()") Remove
      button.btn(@click="items.push({name: '', percents: ''})") Add
</template>

<script>
import {
  required,
  // alphaNum,
  minValue,
  maxValue
} from "vuelidate/lib/validators";

import ItemForm from "@backCmp/Forms/ItemForm";
import InputEventElem from "@components/FormElems/InputEventElem";

import { mapActions } from "vuex";

export default {
  name: "SkillForm",
  components: {
    ItemForm,
    InputEventElem
  },
  props: {
    skill: {
      type: Object,
      default: null
    }
  },
  data() {
    if (!this.skill) {
      return {
        category: "",
        items: [
          {
            name: "Html",
            percents: 1
          },
          {
            name: "Css",
            percents: 1
          },
          {
            name: "JavaScript",
            percents: 1
          }
        ]
      };
    }

    return {
      category: this.skill.category,
      items: this.skill.items.map(item => {
        return { name: item.name, percents: item.percents };
      })
    };
  },
  validations: {
    category: {
      required
    },
    items: {
      required,
      $each: {
        name: {
          required
        },
        percents: {
          required,
          minValue: minValue(1),
          maxValue: maxValue(100)
        }
      }
    }
  },
  methods: {
    ...mapActions(["deleteData", "updateData", "insertData"]),
    getId() {
      return this.skill ? this.skill._id : 0;
    },
    getIndex(index) {
      return parseInt(index) + 1;
    },
    removeSlide(id) {
      console.log(id);

      if (
        confirm(
          `Вы уверены, что хотите удалить пост: "${this.skill.category}"?`
        )
      ) {
        this.deleteData(id);
      }
    },
    submit() {
      if (this.$v.$invalid) {
        return false;
      }

      const data = {
        category: this.category,
        items: this.items.map(item => {
          return { name: item.name, percents: item.percents };
        })
      };

      if (!this.skill) {
        console.log(data);
        this.insertData(data);
      } else {
        this.updateData({ id: this.skill._id, data });
      }

      return true;
    }
  }
};
</script>
