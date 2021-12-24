import { exist } from '@apiHelpers';
import formMixin from '@common/mixins/formMixin';

import { mapActions } from 'vuex';

export default {
  mixins: [formMixin],
  data() {
    return {
      sourceData: {},
      submitData: {},
    };
  },
  computed: {
    disabled() {
      // return this.$v.$pending || this.$v.$invalid;
      return this.$v.$pending;
    },
  },
  methods: {
    ...mapActions(['updateData']),
    cloneMultipleArray(array, propTemplate) {
      return array.map(item => {
        const object = {};

        for (const key in propTemplate) {
          if (propTemplate.hasOwnProperty(key)) {
            object[key] = item[key];
          }
        }

        return object;
      });
    },
    getMultipleArray(root, arrayKey, propTemplate) {
      return exist(arrayKey, root)
        ? this.cloneMultipleArray(root[arrayKey], propTemplate)
        : [];
    },
    defaultFields() {
      return {};
    },
    prepareData() {
      this.submitData = this.item;
    },
    touchInvalidElem() {
      const elemName = this.returnInvalidElem();
      console.log(elemName);
      if (!elemName) {
        return false;
      }

      this.$v[elemName].$touch();

      return true;
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
      // if (this.$v.$invalid) {
      //   return false;
      // }

      if (this.touchInvalidElem()) {
        return false;
      }

      this.prepareData();
      this.updateData({ id: this.item._id, data: this.submitData });

      return true;
    },
  },
};
