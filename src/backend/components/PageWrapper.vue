<template lang="pug">
.container
  h1.section-title.section-main_title.main-big_title {{ title }}
  slot
  SubmitMessage
</template>

<script>
import SubmitMessage from '@components/formElems/SubmitMessage';

import { mapGetters } from 'vuex';

export default {
  name: 'PageWrapper',
  components: {
    SubmitMessage,
  },
  computed: {
    ...mapGetters(['isAuth']),
    title() {
      return !this.isAuth
        ? 'Вы не авторизированы!'
        : `Страница "${this.$route.meta.title}"`;
    },
  },
};
</script>
