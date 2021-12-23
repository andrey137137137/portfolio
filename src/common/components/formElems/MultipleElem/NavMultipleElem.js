import addClassesMixin from '@common/mixins/addClassesMixin';

export default {
  name: 'NavMultipleElem',
  mixins: [addClassesMixin],
  render(h) {
    const $vm = this;
    const elems = [];

    this.list.forEach((item, index) => {
      const { label } = item;
      const domProps = { type: 'button' };

      if (label) {
        domProps.innerHTML = label;
      }

      elems.push(
        h('button', {
          class: $vm.getClasses(index),
          on: {
            click: e => {
              e.preventDefault();
              item.handle();
            },
          },
          domProps,
        }),
      );
    });

    return h('div', { class: $vm.containerClasses }, elems);
  },
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
      return {
        btn: true,
        'form-btn': true,
        ...this.getClassesAsObject(this.list[index].classes),
      };
    },
  },
};
