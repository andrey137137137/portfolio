import addClassesMixin from '@common/mixins/addClassesMixin';

export default {
  name: 'NavMultipleElem',
  render(h) {
    const $vm = this;
    const elems = [];

    this.list.forEach((item, index) => {
      elems.push(
        h('button', {
          class: $vm.getClasses(index),
          on: { click: item.handle },
          domProps: { type: 'button', innerHTML: item.label },
        }),
      );
    });

    return h('div', { class: $vm.containerClasses }, elems);
  },
  mixins: [addClassesMixin],
  props: {
    list: { type: Array, required: true },
  },
  computed: {
    containerClasses() {
      return {
        menu: true,
        ...this.addClasses,
      };
    },
  },
  methods: {
    getClasses(index) {
      const { classes } = this.list[index];
      const compClasses = classes ? classes : {};
      return {
        btn: true,
        ...compClasses,
      };
    },
  },
};
