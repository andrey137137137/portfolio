<template lang="pug">
  button.btn.form-btn(:type="compType" :class="extClass")
    slot
</template>

<script>
import addClassesMixin from '@common/mixins/addClassesMixin';

export default {
  name: 'ButtonElem',
  mixins: [addClassesMixin],
  props: {
    isDanger: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    compType() {
      if (this.type === '') {
        return this.isDanger ? 'button' : 'submit';
      }

      return this.type;
    },
    extClass() {
      return {
        'form-btn--danger': this.isDanger,
        ...this.addClassesMixin,
      };
    },
  },
};
</script>
