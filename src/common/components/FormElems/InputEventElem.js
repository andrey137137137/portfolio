// import types from "@/common/constants/validation/types";
import formElem from "@common/mixins/formElem";

export default {
  mixins: [formElem],
  props: {
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
        if (this.wrapClass === "icon_label") {
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
      return [h("div", { class: "form__row" }, elems)];
    },
    labelElem() {
      return <label class="form__label">{this.label}</label>;
    },
    iconLabelElem() {
      return <label class="form__label" />;
    },
    measureElem() {
      return <span class="form__measure">{this.measure}</span>;
    }
  }
};
