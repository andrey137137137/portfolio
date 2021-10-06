<template lang="pug">
.container
  h1.section-title.section-main_title.main-big_title {{ title }}
  slot
  SubmitMessage
</template>

<script>
import { exist } from '@apiHelpers';
import loadDataMixin from '@common/mixins/loadDataMixin';
import SubmitMessage from '@components/formElems/SubmitMessage';

import { mapGetters } from 'vuex';

export default {
  name: 'PageWrapper',
  components: {
    SubmitMessage,
  },
  mixins: [loadDataMixin],
  computed: {
    ...mapGetters(['isAuth']),
    title() {
      return !this.isAuth
        ? 'Вы не авторизированы!'
        : `Страница "${this.$route.meta.title}"`;
    },
  },
  created() {
    this.isItFront(exist('isFront', this.$route.meta));
    this.loadData();
  },
};
</script>
