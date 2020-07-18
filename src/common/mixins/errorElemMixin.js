export default {
  data() {
    return {
      isError: false
    };
  },
  methods: {
    isEmptyRequired(value) {
      return this.isError && !value;
    },
    errorType(value, type) {
      if (this.isEmptyRequired(value)) {
        return "required";
      }

      if (this.isError) {
        return type;
      }

      return "";
    }
  }
};
