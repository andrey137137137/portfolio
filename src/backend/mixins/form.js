import exist from "@common/helpers/exist";
import { mapActions } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      submitData: {}
    };
  },
  computed: {
    disabled() {
      return this.$v.$pending || this.$v.$invalid;
    }
  },
  methods: {
    ...mapActions(["updateData"]),
    cloneMultipleArray(array, props) {
      return array.map(item => {
        const object = {};

        for (const key in props) {
          if (props.hasOwnProperty(key)) {
            object[key] = item[key];
          }
        }

        return object;
      });
    },
    getMultipleArray(root, arrayKey, props) {
      return exist(arrayKey, root)
        ? this.cloneMultipleArray(root[arrayKey], props)
        : [];
    },
    defaultFields() {
      return {};
    },
    prepareData() {
      this.submitData = this.item;
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
      this.updateData({ id: this.item._id, data: this.submitData });

      return true;
    }
  }
};
