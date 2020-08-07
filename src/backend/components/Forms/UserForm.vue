<template lang="pug">
AdminFormWrapper(@submit.prevent.native='handleSubmit')
  slot

  .form-row.form-row--buttons
    ButtonElem(:disabled='disabled', :addClasses='buttonWrapperClass') Обновить
</template>

<script>
import AdminFormWrapper from '@backCmp/AdminFormWrapper';
import ButtonElem from '@components/formElems/ButtonElem';

export default {
  name: 'UserForm',
  components: {
    AdminFormWrapper,
    ButtonElem,
  },
  props: {
    handleSubmit: {
      type: Function,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    buttonWrapperClass() {
      return {
        'form-col': true,
        'form-btn--disabled': this.disabled,
      };
    },
  },
};
</script>
