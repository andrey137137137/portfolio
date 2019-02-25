<template lang="pug">
  div(v-for="(v, index) in $v.techs.$each.$iter")
    InputEventElem(
      type="number"
      v-model="v.percents.$model"
      :val="v.percents"
      :placeholder="`Владение ${getIndex(index)}`"
      measure="%")
    .menu
      button.btn(@click="techs.pop()") Remove
      button.btn(@click="techs.push({name: ''})") Add
</template>

<script>
import InputEventElem from "@components/FormElems/InputEventElem";

export default {
  name: "MultipleElem",
  components: {
    InputEventElem
  },
  render(h) {
    let elems = [];

    vals.forEach((val, valIndex) => {
      items[valIndex].fields.forEach((field, fieldIndex) => {
        elems.push(
          this.inputEvElem(
            h,
            items[index].type,
            field.prop,
            items[index].placeholder
          )
        );
      });
    });

    return h("div", {});
  },
  props: {
    items: {
      type: Object,
      required: true
    },
    itemProps: {
      type: Object,
      required: true
    },
    vals: {
      type: Object,
      required: true
    }
  },
  methods: {
    getIndex(index) {
      return parseInt(index) + 1;
    },
    inputEvElem(h, type, val, placeholder) {
      return h("InputEventElem", {
        domProps: {
          type,
          val,
          placeholder: `${placeholder} ${this.getIndex(index)}`
        }
      });
    }
  }
};
</script>
