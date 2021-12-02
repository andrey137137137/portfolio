import InputEventElem from '@components/formElems/InputEventElem';

export default {
  name: 'MultipleElem',
  components: {
    InputEventElem,
  },
  render(h) {
    let elems = [];

    for (const valIndex in this.vals) {
      if (this.vals.hasOwnProperty(valIndex)) {
        this.fields.forEach(field => {
          elems.push(
            this.inputEvElem(
              h,
              valIndex,
              this.vals[valIndex],
              field.name,
              field.type,
              field.placeholder,
            ),
          );
        });
      }
    }

    return h('div', {}, [...elems.map(elem => elem), this.navElem(h)]);
  },
  props: {
    vals: {
      type: Object,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    propTemplate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoaded: false,
      compItems: [],
    };
  },
  methods: {
    getIndex(index) {
      return parseInt(index) + 1;
    },
    inputEvElem(h, index, val, fieldName, type, placeholder) {
      const $vm = this;
      return h('InputEventElem', {
        props: {
          type,
          value: val[fieldName].$model,
          val: val[fieldName],
          placeholder: `${placeholder} ${this.getIndex(index)}`,
        },
        on: {
          input: value => {
            $vm.items[index][fieldName] = value;
            val.$touch();
            $vm.$emit('input', value);
          },
        },
      });
    },
    removeItem(e) {
      e.preventDefault();
      this.items.pop();
    },
    addItem(e) {
      e.preventDefault();

      const template = {};

      for (const key in this.propTemplate) {
        if (this.propTemplate.hasOwnProperty(key)) {
          template[key] = this.propTemplate[key];
        }
      }

      this.items.push(template);
    },
    navElem(h) {
      return h('div', { class: 'menu' }, [
        h('button', {
          class: 'btn',
          on: { click: this.removeItem },
          domProps: { type: 'button', innerHTML: 'Remove' },
        }),
        h('button', {
          class: 'btn',
          on: { click: this.addItem },
          domProps: { type: 'button', innerHTML: 'Add' },
        }),
      ]);
    },
  },
};
