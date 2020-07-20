<template lang="pug">
  .form-error_wrap(:style="position")
    transition(name="fade")
      .form-error_tip_wrap(v-show="error")
        .form-error {{error}}
</template>

<script>
import exist from "@common/helpers/exist";
import errors from "@common/constants/validation/errors";

export default {
  name: "ErrorElem",
  props: {
    type: {
      type: String,
      default: ""
      // required: true
    },
    message: {
      type: String,
      default: ""
    },
    styleTop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      marginTop: 10
    };
  },
  computed: {
    position() {
      return `{top: ${marginTop + styleTop}px;}`;
    },
    error() {
      if (this.message) return this.message;
      if (!this.type) return "";

      return exist(this.type, errors) ? errors[this.type] : errors.other;
    },
    required() {
      return this.type == "required" ? true : false;
    }
  }
};
</script>
