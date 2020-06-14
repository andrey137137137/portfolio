import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuth"])
  },
  methods: {
    ...mapActions(["setAuthStatus"])
  },
  created() {
    this.setAuthStatus();
  }
};
