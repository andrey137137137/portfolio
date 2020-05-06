import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("flipChecker");

export default {
  computed: {
    ...mapGetters(["isFlipped"]),
  },
  methods: {
    ...mapActions(["flipCheck"]),
    fadeButton() {
      this.flipCheck(!this.isFlipped);
    },
  },
};
