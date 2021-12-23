import InputEventElem from '@components/formElems/InputEventElem';
import NavMultipleElem from './NavMultipleElem';

export default {
  name: 'MultipleElem',
  components: {
    InputEventElem,
    NavMultipleElem,
  },
  render(h) {
    let elems = [];
    let fieldsCount = 0;

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
              !this.arePairs || (this.arePairs && fieldsCount % 2 != 0),
            ),
          );
          fieldsCount++;
        });
      }
    }

    return h('div', {}, [
      ...elems.map(elem => elem),
      h('NavMultipleElem', {
        props: {
          list: [
            { label: 'Remove', handle: this.removeItem },
            { label: 'Add', handle: this.addItem },
          ],
        },
      }),
    ]);
  },
  props: {
    vals: { type: Object, required: true },
    items: { type: Array, required: true },
    fields: { type: Array, required: true },
    propTemplate: { type: Object, required: true },
    arePairs: { type: Boolean, default: false },
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
    inputEvElem(h, index, val, fieldName, type, placeholder, toSetMultipleNav) {
      const curIndex = +index;
      const $vm = this;
      const multipleNav = [];

      if (toSetMultipleNav) {
        if (curIndex) {
          multipleNav.push({
            classes: { 'btn-arrow_up': true },
            label: 'toPrev',
            handle: () => {
              $vm.toPrevItem(curIndex);
            },
          });
        }

        if (curIndex < $vm.items.length - 1) {
          multipleNav.push({
            classes: { 'btn-arrow_down': true },
            label: 'toNext',
            handle: () => {
              $vm.toNextItem(curIndex);
            },
          });
        }
      }

      return h('InputEventElem', {
        props: {
          type,
          value: val[fieldName].$model,
          val: val[fieldName],
          placeholder: `${placeholder} ${$vm.getIndex(curIndex)}`,
          multipleNav,
        },
        on: {
          input: value => {
            $vm.items[curIndex][fieldName] = value;
            val.$touch();
            $vm.$emit('input', value);
          },
        },
      });
    },
    replaceItems(index, nearIndex) {
      const temp = this.items[nearIndex];
      this.$set(this.items, nearIndex, this.items[index]);
      this.$set(this.items, index, temp);
    },
    toPrevItem(index) {
      this.replaceItems(index, index - 1);
    },
    toNextItem(index) {
      this.replaceItems(index, index + 1);
    },
    removeItem() {
      this.items.pop();
    },
    addItem() {
      const template = {};

      for (const key in this.propTemplate) {
        if (this.propTemplate.hasOwnProperty(key)) {
          template[key] = this.propTemplate[key];
        }
      }

      this.items.push(template);
    },
    // navElem(h) {
    //   return h('div', { class: 'menu' }, [
    //     h('button', {
    //       class: 'btn',
    //       on: { click: this.removeItem },
    //       domProps: { type: 'button', innerHTML: 'Remove' },
    //     }),
    //     h('button', {
    //       class: 'btn',
    //       on: { click: this.addItem },
    //       domProps: { type: 'button', innerHTML: 'Add' },
    //     }),
    //   ]);
    // },
  },
};
