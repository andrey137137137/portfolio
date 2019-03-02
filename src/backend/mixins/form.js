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
      submitData: {},
      removeTitle: "запись",
      removeValue: ""
    };
  },
  computed: {
    id() {
      return this.item ? this.item._id : 0;
    },
    disabled() {
      return this.$v.$pending || this.$v.$invalid;
    }
  },
  methods: {
    ...mapActions(["deleteData", "updateData", "insertData"]),
    removeItem() {
      console.log(this.id);

      if (
        confirm(
          `Вы уверены, что хотите удалить ${this.removeTitle}: "${
            this.removeValue
          }"?`
        )
      ) {
        this.deleteData(this.id);
      }
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

      if (!this.item) {
        console.log(this.submitData);
        this.insertData(this.submitData);
        this.reset();
      } else {
        this.updateData({ id: this.item._id, data: this.submitData });
      }

      return true;
    }
  }
};
