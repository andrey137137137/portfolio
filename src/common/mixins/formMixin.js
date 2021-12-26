import { validationMixin } from 'vuelidate';
import types from '@common/constants/validation/types.js';

export default {
  mixins: [validationMixin],
  // validations() {
  //   return this.fields;
  // },
  computed: {
    isFront() {
      return this.$route.meta.isFront;
    },
  },
  methods: {
    getValue(value, type) {
      if (typeof value !== 'undefined') {
        return value;
      }

      switch (type) {
        case types.native.checkbox:
          return false;
        case types.native.radio:
          return 0;
        default:
          return '';
      }
    },
    returnInvalidElem() {
      if (!this.$v.$invalid) {
        return false;
      }

      for (const key in this.$v) {
        if (
          this.$v.hasOwnProperty(key) &&
          key.slice(0, 1) !== '$' &&
          this.$v[key].$invalid
        ) {
          return key;
        }
      }
    },
    touchInvalidElem() {
      const elemName = this.returnInvalidElem();

      if (!elemName) {
        return false;
      }

      if (this.isFront) {
        this.$refs[elemName].touchHandle();
      } else {
        this.$v[elemName].$touch();
      }

      return true;
    },
    baseConfirmAction(actionStr) {
      return confirm(`Вы уверены, что хотите ${actionStr}?`);
    },
    confirmAction() {
      return baseConfirmAction('обновить данные');
    },
    submitActions() {},
    submit() {
      if (this.touchInvalidElem()) {
        return false;
      }
      if (!this.isFront && !this.confirmAction()) {
        return false;
      }
      this.submitActions();
      return true;
    },
  },
};
