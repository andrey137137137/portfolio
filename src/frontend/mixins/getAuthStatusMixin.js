import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuth']),
  },
  methods: {
    ...mapActions(['getAuthStatus']),
  },
  created() {
    this.getAuthStatus();
  },
};
