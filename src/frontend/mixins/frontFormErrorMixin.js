export default {
  data() {
    return {
      error: ""
    };
  },
  methods: {
    set(value) {
      this.error = value;
    },
    delete() {
      this.error = "";
    }
  }
};
