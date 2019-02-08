<template lang="pug">
  .form__error_wrap
    transition(name="fade")
      .form__error(v-if="type") {{error}}
</template>

<script>
import exist from "@/common/helpers/exist";
import errors from "@/common/constants/validation/errors";

export default {
  name: "ErrorElem",
  props: {
    type: {
      type: String,
      // default: ""
      required: true
    }
  },
  computed: {
    error() {
      if (!this.type) {
        return "";
      }

      return exist(this.type, errors) ? errors[this.type] : errors.other;
    },
    required() {
      return this.type == "required" ? true : false;
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.fade-enter-to, .fade-leave /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 1;
}
</style>
