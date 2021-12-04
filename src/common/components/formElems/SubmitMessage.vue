<template lang="pug">
transition(name='fade')
  .form-popup(v-if='isShown')
    p {{ message }}
    a.btn.form-popup_btn(href='', @click.prevent='CLOSE_FORM_MESSAGE') Закрыть
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { CLOSE_FORM_MESSAGE } from '@common/store/mutation-types';

export default {
  name: 'SubmitMessage',
  computed: {
    ...mapGetters(['message', 'isFormMessageClosed']),
    isShown() {
      return this.message && !this.isFormMessageClosed;
    },
  },
  methods: {
    ...mapActions([CLOSE_FORM_MESSAGE]),
  },
};
</script>
