<template lang="pug">
  button.btn.form-btn(:type="type" :class="extClass")
    slot
</template>

<script>
import addClassesMixin from "@/common/mixins/addClassesMixin";

export default {
  name: "ButtonElem",
  mixins: [addClassesMixin],
  props: {
    isDanger: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    type() {
      return this.isDanger ? "button" : "submit";
    },
    extClass() {
      return {
        "form-btn--danger": this.isDanger,
        ...this.addClassesMixin
      };
    }
  }
};
</script>
