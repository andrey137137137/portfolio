import formMixin from '@common/mixins/formMixin';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('frontFormError');

export default {
  mixins: [formMixin],
  computed: {
    ...mapGetters(['formInputName', 'formError']),
    errorStyleTop() {
      if (!this.formInputName) {
        return 0;
      }
      return this.$refs[this.formInputName].$el.offsetTop;
    },
  },
  methods: {
    ...mapActions(['clearFormError']),
  },
  created() {
    this.clearFormError();
  },
};
