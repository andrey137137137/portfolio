import { exist } from '@apiHelpers';
import formElemMixin from '@common/mixins/formElemMixin';
import SvgCmp from '@components/SvgCmp';
import NavMultipleElem from '@components/formElems/MultipleElem/NavMultipleElem';

export default {
  name: 'InputEventElem',
  components: {
    NavMultipleElem,
  },
  mixins: [formElemMixin],
  props: {
    labelIcon: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    measure: { type: String, default: '' },
    multipleNav: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    elemsBeforeInput() {
      let elems = [];

      if (this.label) {
        if (this.labelIcon) {
          elems.push(this.iconLabelElem());
        } else {
          elems.push(this.labelElem());
        }
      }

      return elems;
    },
    elemsAfterInput(h) {
      let elems = [];

      if (this.measure) {
        elems.push(this.measureElem());
      }

      if (exist(0, this.multipleNav)) {
        elems.push(
          h('NavMultipleElem', {
            props: {
              list: this.multipleNav,
            },
          }),
        );
      }

      return elems;
    },
    wrapInput(h, elems) {
      return [h('div', { class: 'form-row' }, elems)];
    },
    labelElem() {
      return <label class="form-label">{this.label}</label>;
    },
    iconLabelElem() {
      return (
        <label class="form-label">
          <SvgCmp class="form-icon" name={this.labelIcon} />
        </label>
      );
    },
    measureElem() {
      return <span class="form-measure">{this.measure}</span>;
    },
  },
};
