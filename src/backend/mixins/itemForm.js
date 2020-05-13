import { mapActions } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      removeTitle: "запись",
      removeValue: "",
    };
  },
  computed: {
    id() {
      return this.item ? this.item._id : 0;
    },
  },
  methods: {
    ...mapActions(["deleteData", "insertData"]),
    removeItem() {
      if (
        confirm(
          `Вы уверены, что хотите удалить ${this.removeTitle}: "${this.id}"?`,
        )
      ) {
        this.deleteData(this.id);
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
    },
  },
};
