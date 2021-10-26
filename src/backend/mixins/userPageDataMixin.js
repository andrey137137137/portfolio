import pageDataMixin from '@backend/mixins/pageDataMixin';

export default {
  mixins: [pageDataMixin],
  data() {
    return {
      // user: null,
      // isUpdated: false,
    };
  },
  computed: {
    user() {
      return this.dbData[0];
    },
  },
  // methods: {
  //   setData() {
  //     if (!this.isUpdated) {
  //       this.user = this.compUser;
  //     }

  //     this.isUpdated = true;
  //   },
  // },
  // watch: {
  //   dbData(newValue) {
  //     console.log(this.$options.name);
  //     console.log(newValue);
  //     this.user = newValue[0];
  //   },
  // },
  // mounted() {
  //   this.setData();
  // },
  // updated() {
  //   this.setData();
  // },
};
