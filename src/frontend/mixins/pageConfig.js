import { mapGetters, mapActions, createNamespacedHelpers } from "vuex";
const viewMapGetters = createNamespacedHelpers("frontView").mapGetters;

export default {
  computed: {
    ...mapGetters(["dbData"]),
    ...viewMapGetters(["config"])
  },
  methods: {
    ...mapActions(["readData"])
  },
  created() {
    this.readData();
  }
};
