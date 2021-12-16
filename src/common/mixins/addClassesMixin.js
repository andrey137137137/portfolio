import concatClassesMixin from '@common/mixins/concatClassesMixin';

export default {
  mixins: [concatClassesMixin],
  props: {
    addClasses: {
      type: [String, Object, Array],
      default: '',
    },
  },
  computed: {
    compClasses() {
      return this.getClassesAsObject(this.addClasses);
    },
  },
};
