<template lang="pug">
  .form-wrap.form-wrap--number(:class="addClasses")
    .form-row
      label.form-label(v-if="label") {{label}}
      input.form-input(
        type="number"
        v-model="state"
        :class="validationClass"
        :placeholder="placeholder"
        @blur.once="val.$touch()")
      span.form-measure(v-if="measure") {{measure}}
    ErrorElem(:type="errorType")
</template>

<script>
import addClasses from "@common/mixins/addClasses";
import formElem from "@common/mixins/formElem";
import ErrorElem from "@/components/FormElems/ErrorElem";

export default {
  name: "NumberElem",
  components: {
    ErrorElem
  },
  mixins: [addClasses, formElem],
  props: {
    measure: {
      type: String,
      default: ""
    }
  }
};
</script>
