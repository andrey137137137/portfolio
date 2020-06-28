<template lang="pug">
  .form-error_wrap
    .form-error_tip_wrap(v-if="isTip" v-show="error")
    transition(v-else name="fade")
      .form-error_tip_wrap(v-if="error")
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
    isTip: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
