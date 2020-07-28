import formMixin from '@common/mixins/formMixin';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('frontFormError');

export default {
  mixins: [formMixin],
  computed: {
    ...mapGetters(['formInputName', 'formError']),
    errorStyleTop() {
      if (!this.formInputName) return 0;

      const $inputElem = this.$refs[this.formInputName].$el;

      // return $inputElem.offsetTop + $inputElem.offsetHeight;
      return $inputElem.offsetTop + 45;
    },
  },
  methods: {
    touchInvalidElem() {
      const elemName = this.returnInvalidElem();

      if (!elemName) {
        return true;
      }

      this.$refs[elemName].touchHandle();

      return false;
    },
    handleSubmit() {
      console.log('fkjdklsfjdkls');
      if (!this.touchInvalidElem()) return false;
      return true;
    },
  },
};
