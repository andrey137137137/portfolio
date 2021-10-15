import pageDataMixin from '@backend/mixins/pageDataMixin';

export default {
  mixins: [pageDataMixin],
  data() {
    return {
      user: null,
      isUpdated: false,
    };
  },
  computed: {
    compUser() {
      return this.dbData[0];
    },
  },
  methods: {
    setData() {
      if (!this.isUpdated) {
        this.user = this.compUser;
      }

      this.isUpdated = true;
    },
  },
  mounted() {
    this.setData();
  },
  updated() {
    this.setData();
  },
};
