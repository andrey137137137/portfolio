import formElemMixin from '@common/mixins/formElemMixin';

export default {
  mixins: [formElemMixin],
  model: {
    prop: 'value',
    event: 'change',
  },
  methods: {
    elemsAfterInput() {
      let elems = [];

      elems.push(this.checkedElem());

      if (this.label) {
        elems.push(this.checkboxTextElem());
      }

      return elems;
    },
    wrapInput(h, elems) {
      return [h('label', { class: 'form-label' }, elems)];
    },
    checkedElem() {
      return <div class="form-checked" />;
    },
    checkboxTextElem() {
      return <div class="form-checkbox_text">{this.label}</div>;
    },
  },
};
