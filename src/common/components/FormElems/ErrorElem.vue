<template lang="pug">
.form-error_wrap(:style='position')
  transition(name='fade')
    .form-error_tip_wrap(v-show='message')
      .form-error {{ message }}
</template>

<script>
export default {
  name: 'ErrorElem',
  props: {
    message: {
      type: String,
      default: '',
    },
    styleTop: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      marginTop: 45,
    };
  },
  computed: {
    position() {
      return { top: `${this.marginTop + this.styleTop}px` };
    },
    required() {
      return this.type == 'required' ? true : false;
    },
  },
};
</script>
