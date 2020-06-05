import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["dbData"])
  },
  methods: {
    ...mapActions(["readData"])
  },
  created() {
    this.readData();
  }
};
