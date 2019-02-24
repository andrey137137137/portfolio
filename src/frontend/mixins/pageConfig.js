import { mapGetters, mapActions, createNamespacedHelpers } from "vuex";
const viewMapGetters = createNamespacedHelpers("frontView").mapGetters;
// const viewMapActions = createNamespacedHelpers("frontView").mapActions;

export default {
  computed: {
    ...mapGetters(["dbData"]),
    ...viewMapGetters(["config"])
  },
  methods: {
    ...mapActions(["readData"])
    // ...viewMapActions(["setConfig"])
  },
  created() {
    this.readData();
    // this.setConfig(this.configParams);
    for (const key in this.dbData) {
      console.log(this.dbData[key]);
    }
  }
};
