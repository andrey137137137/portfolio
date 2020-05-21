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
    MultipleElem(
      :vals="$v.items.$each.$iter"
      :items="items"
      :fields="fields"
      :propTemplate="propTemplate")
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minValue, maxValue } from "vuelidate/lib/validators";
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
    defaultFields() {
      return {
        category: "",
        items: [
          {
            name: "HTML",
            percents: 1
          },
          {
            name: "CSS",
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
        items: this.cloneMultipleArray(this.items, this.propTemplate)
      };
    }
  }
};
</script>
