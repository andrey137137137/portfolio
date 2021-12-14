import formElemMixin from '@common/mixins/formElemMixin';

export default {
  name: 'ChangeEventElem',
  mixins: [formElemMixin],
  model: {
    prop: 'value',
    event: 'change',
  },
  methods: {
    elemsAfterInput(h, index) {
      let elems = [];

      elems.push(this.checkedElem());

      const label = this.getValueOption(index, 'label') || this.label;

      if (label) {
        elems.push(this.checkboxTextElem(h, label));
      }

      return elems;
    },
    wrapInput(h, elems, index) {
      // const addWrapClasses =
      //   index >= 0 ? this.values[index].addWrapClasses : false;
      const addWrapClasses = this.getValueOption(index, 'addWrapClasses');
      console.log(this.name + ': ' + addWrapClasses);
      const classes = {
        'form-label': true,
        [addWrapClasses]: addWrapClasses,
      };
      return [h('label', { class: classes }, elems)];
    },
    checkedElem() {
      return <div class="form-checked" />;
    },
    checkboxTextElem(h, label) {
      console.log(this.name + ': ' + label);
      return <div class="form-checkbox_text">{label}</div>;
    },
  },
};
