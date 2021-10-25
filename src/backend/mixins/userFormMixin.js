import backFormMixin from '@backend/mixins/backFormMixin';

export default {
  mixins: [backFormMixin],
  props: {
    params: {
      type: Object,
      default: null,
    },
  },
  methods: {
    defaultFields() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        old: 0,
        contacts: [],
      };
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
  watch: {
    params(newValue) {
      console.log(this.$options.name);
      console.log(newValue);
      const { firstName, lastName, old } = newValue;
      this.firstName = firstName;
      this.lastName = lastName;
      this.old = old;
    },
  },
};
