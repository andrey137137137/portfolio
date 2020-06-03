import formElem from "@common/mixins/formElem";
import SvgCmp from "@components/SvgCmp";

export default {
  mixins: [formElem],
  props: {
    labelIcon: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    measure: {
      type: String,
      default: ""
    }
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
    elemsAfterInput() {
      let elems = [];

      if (this.measure) {
        elems.push(this.measureElem());
      }

      return elems;
    },
    wrapInput(h, elems) {
      return [h("div", { class: "form-row" }, elems)];
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
    }
  }
};
