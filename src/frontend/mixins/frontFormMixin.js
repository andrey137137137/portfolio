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
    touchInvalidElem() {
      const elemName = this.returnInvalidElem();

      if (!elemName) {
        return true;
      }

      this.$refs[elemName].touchHandle();
      return false;
    },
    handleSubmit() {
      if (!this.touchInvalidElem()) {
        return false;
      }
      return true;
    },
  },
  created() {
    this.clearFormError();
  },
};
