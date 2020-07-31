export default {
  methods: {
    getRoutes(cb) {
      return this.$router.options.routes.filter(cb);
    },
  },
};
