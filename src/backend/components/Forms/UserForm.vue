<template lang="pug">
  FormWrapper(@submit.prevent.native="handleSubmit")
    slot

    .form-row.form-row--buttons
      ButtonElem(
        :disabled="disabled"
        :addClasses="buttonWrapperClass"
      ) Обновить
</template>

<script>
import FormWrapper from "@components/FormElems/FormWrapper";
import ButtonElem from "@components/FormElems/ButtonElem";

export default {
  name: "UserForm",
  components: {
    FormWrapper,
    ButtonElem
  },
  props: {
    handleSubmit: {
      type: Function,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    buttonWrapperClass() {
      return {
        "form-col": true,
        "form-btn--disabled": this.disabled
      };
    }
  }
};
</script>
