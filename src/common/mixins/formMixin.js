import { validationMixin } from "vuelidate";
import types from "@common/constants/validation/types.js";

export default {
  mixins: [validationMixin],
  // validations() {
  //   return this.fields;
  // },
  methods: {
    getValue(value, type) {
      if (typeof value !== "undefined") {
        return value;
      }

      switch (type) {
        case types.native.checkbox:
          return false;
        case types.native.radio:
          return 0;
        default:
          return "";
      }
    },
    returnInvalidElem() {
      if (!this.$v.$invalid) return false;

      for (const key in this.$v) {
        if (
          this.$v.hasOwnProperty(key) &&
          key.slice(0, 1) !== "$" &&
          this.$v[key].$invalid
        ) {
          return key;
        }
      }
    }
  }
};
