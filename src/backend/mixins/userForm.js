export default {
  props: {
    firstName: {
      type: String,
      default: ""
    },
    lastName: {
      type: String,
      default: ""
    },
    contacts: {
      type: Array,
      default: () => []
    },
    email: {
      type: String,
      default: ""
    },
    username: {
      type: String,
      default: ""
    }
  },
  methods: {
    defaultFields() {
      return {};
    },
    prepareData() {
      this.submitData = {};
    },
    reset() {
      const data = this.defaultFields();

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this[key] = data[key];
        }
      }
    },
    submit() {
      if (this.$v.$invalid) {
        return false;
      }

      this.prepareData();
      this.updateData({ data: this.submitData });

      return true;
    }
  }
};
