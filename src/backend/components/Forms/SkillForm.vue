<template lang="pug">
  ItemForm(
    :handleSubmit="submit"
    :handleDelete="removeItem"
    :id="id"
    :disabled="disabled"
  )
    InputEventElem(
      v-model="category"
      :val="$v.category"
      placeholder="Категория")
    //- div(v-for="(v, index) in $v.items.$each.$iter")
    //-   .form__legend Обновить навык
    //-   InputEventElem(
    //-     v-model="v.name.$model"
    //-     :val="v.name"
    //-     :placeholder="`Навык ${getIndex(index)}`")
    //-   InputEventElem(
    //-     type="number"
    //-     v-model="v.percents.$model"
    //-     :val="v.percents"
    //-     :placeholder="`Владение ${getIndex(index)}`"
    //-     measure="%")
    //- .menu
    //-   button.btn(@click="items.pop()") Remove
    //-   button.btn(@click="items.push({name: '', percents: ''})") Add
    MultipleElem(
      :vals="$v.items.$each.$iter"
      :items="items"
      :fields="fields"
      :propTemplate="propTemplate")
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  // alphaNum,
  minValue,
  maxValue
} from "vuelidate/lib/validators";
import formMxn from "@backend/mixins/form";
import itemFormMxn from "@backend/mixins/itemForm";
import ItemForm from "@backCmp/Forms/ItemForm";
import InputEventElem from "@components/FormElems/InputEventElem";
import MultipleElem from "@components/FormElems/MultipleElem";

export default {
  name: "SkillForm",
  components: {
    ItemForm,
    InputEventElem,
    MultipleElem
  },
  mixins: [validationMixin, formMxn, itemFormMxn],
  data() {
    const data = {
      fields: [
        {
          name: "name",
          type: "text",
          placeholder: "Навык"
        },
        {
          name: "percents",
          type: "number",
          placeholder: "Владение"
        }
      ],
      propTemplate: { name: "", percents: "" }
    };

    if (!this.item) {
      return { ...data, ...this.defaultFields() };
    }

    return {
      ...data,
      category: this.item.category,
      // items: exist("items", this.item)
      //   ? this.item.items.map(item => {
      //       return { name: item.name, percents: item.percents };
      //     })
      //   : [],
      items: this.getMultipleArray(this.item, "items", data.propTemplate)
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
    // getIndex(index) {
    //   return parseInt(index) + 1;
    // },
    defaultFields() {
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
    },
    prepareData() {
      this.submitData = {
        category: this.category,
        // items: this.items.map(item => {
        //   return { name: item.name, percents: item.percents };
        // }),
        items: this.cloneMultipleArray(this.items, this.propTemplate)
      };
    }
  }
};
</script>
