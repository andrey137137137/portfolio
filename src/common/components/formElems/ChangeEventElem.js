import formElemMixin from '@common/mixins/formElemMixin';

export default {
  name: 'ChangeEventElem',
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
      const addWrapClasses = this.areManyInputs
        ? this.values[this.curIndex].addWrapClasses
        : false;
      const classes = {
        'form-label': true,
        [addWrapClasses]: addWrapClasses,
      };
      return [h('label', { class: classes }, elems)];
    },
    checkedElem() {
      return <div class="form-checked" />;
    },
    checkboxTextElem() {
      return <div class="form-checkbox_text">{this.label}</div>;
    },
  },
};
