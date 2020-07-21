import exist from "@common/helpers/exist";
import errors from "@common/constants/validation/errors";

export default {
  // data() {
  //   return {
  //     isError: false
  //   };
  // },
  computed: {
    isEmptyRequired() {
      return this.val.$error && !this.value;
    },
    error() {
      if (this.isEmptyRequired) {
        return errors["required"];
      }

      if (this.val.$error) {
        return exist(this.type, errors) ? errors[this.type] : errors.other;
      }

      return "";
    }
  }
};
