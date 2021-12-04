<template lang="pug">
AdminFormWrapper(@submit.prevent.native='handleSubmit')
  slot

  .form-row.form-row--buttons
    ButtonElem(
      v-if='id',
      :addClasses='buttonWrapperClass',
      :isDanger='true',
      @click.prevent.native='remove()'
    ) Удалить
    ButtonElem(:disabled='disabled', :addClasses='buttonWrapperClass') {{ buttonValue }}
</template>

<script>
import AdminFormWrapper from '@backCmp/AdminFormWrapper';
import ButtonElem from '@components/formElems/ButtonElem';

export default {
  name: 'ItemForm',
  components: {
    AdminFormWrapper,
    ButtonElem,
  },
  props: {
    handleSubmit: { type: Function, required: true },
    disabled: { type: Boolean, required: true },
    handleDelete: {
      type: Function,
      default: () => {},
    },
    id: {
      // type: Number,
      default: 0,
    },
  },
  computed: {
    buttonWrapperClass() {
      return {
        'form-col': true,
        'form-btn--disabled': this.disabled,
      };
    },
    buttonValue() {
      return this.id ? 'Обновить' : 'Добавить';
    },
  },
  methods: {
    remove() {
      if (this.id) {
        this.handleDelete(this.id);
      }
    },
  },
};
</script>
