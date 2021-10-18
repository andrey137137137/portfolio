import backFormMixin from '@backend/mixins/backFormMixin';

export default {
  mixins: [backFormMixin],
  props: {
    params: {
      type: Object,
      default: null,
    },
  },
  data() {
    const { firstName, lastName, email, username, old } = this.params;
    return {
      firstName,
      lastName,
      email,
      username,
      old,
    };
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
    },
  },
};
