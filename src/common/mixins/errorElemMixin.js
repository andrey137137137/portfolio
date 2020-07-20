export default {
  data() {
    return {
      isError: false
    };
  },
  computed: {
    isEmptyRequired() {
      return this.isError && !this.value;
    },
    errorType() {
      if (this.isEmptyRequired) {
        return "required";
      }

      if (this.isError) {
        return this.type;
      }

      return "";
    }
  }
};
