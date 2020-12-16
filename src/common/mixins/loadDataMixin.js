import { exist } from '@apiHelpers';
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['isItFront', 'setPage', 'readData']),
    loadData() {
      if (exist('page', this.$route.meta)) {
        this.setPage(this.$route.meta.page);
        this.readData();
      }
    },
  },
};
