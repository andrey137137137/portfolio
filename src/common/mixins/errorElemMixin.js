export default {
  computed: {
    isEmptyRequired() {
      return this.val.$error && !this.value;
    },
    errorType() {
      if (this.isEmptyRequired) {
        return "required";
      }

      if (this.val.$error) {
        return this.type;
      }

      return "";
    }
  }
};
