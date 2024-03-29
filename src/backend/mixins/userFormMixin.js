import { watchVar } from '@common/helpers';
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
    return this.defaultFields();
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
    submitActions() {
      this.prepareData();
      this.updateData({ data: this.submitData });
    },
  },
  watch: {
    params(newValue) {
      watchVar(this, newValue);
    },
  },
};
