// import types from "@/common/constants/validation/types";
import addClasses from "@/common/mixins/addClasses";
import formElem from "@common/mixins/formElem";

export default {
  mixins: [addClasses, formElem],
  model: {
    prop: "value",
    event: "change"
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
      return [h("label", { class: "form__label" }, elems)];
    },
    checkedElem() {
      return <div class="form__checked" />;
    },
    checkboxTextElem() {
      return <div class="form__checkbox_text">{this.label}</div>;
    }
  }
};
