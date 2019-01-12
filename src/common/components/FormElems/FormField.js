// import types from "@/common/constants/validation/types";
import addClasses from "@/common/mixins/addClasses";
import ErrorElem from "@components/FormElems/ErrorElem";
import InputElem from "@components/FormElems/InputElem";
import TextareaElem from "@components/FormElems/TextareaElem";

export default {
  functional: true,
  render(h, context) {
    function labelElem() {
      return <label class="form__label">{context.label}</label>;
    }

    function iconLabelElem() {
      return <label class="form__label" />;
    }

    function checkedElem() {
      return <div class="form__checked" />;
    }

    function checkboxTextElem() {
      return <div class="form__checkbox_text">{context.label}</div>;
    }

    function errorElem() {
      return <ErrorElem type={context.errorType} />;
    }

    function measureElem() {
      return <span class="form__measure">{context.measure}</span>;
    }

    function inputElem() {
      switch (context.type) {
        case "textarea":
          return (
            <TextareaElem
              type={context.type}
              value={context.value}
              placeholder={context.placeholder}
            />
          );
        default:
          return (
            <InputElem
              type={context.type}
              value={context.value}
              placeholder={context.placeholder}
            />
          );
      }
    }

    const wrapClass = context.wrapClass ? context.wrapClass : context.type;
    let elems = [];

    if (context.label && wrapClass !== "checkbox") {
      if (wrapClass === "icon_label") {
        elems.push(iconLabelElem());
      } else {
        elems.push(labelElem());
      }
    }

    elems.push(inputElem());

    if (context.measure) {
      elems.push(measureElem());
    }

    switch (context.type) {
      case "checkbox":
        elems.push(checkedElem());

        if (context.label) {
          elems.push(checkboxTextElem());
        }

        elems = [h("label", { class: "form__label" }, elems)];
        break;
      default:
        if (wrapClass === "icon_label" || context.type === "number") {
          elems = [h("div", { class: "form__row" }, elems)];
        }
        break;
    }

    return h(
      "div",
      {
        class: {
          form__wrap: true,
          [`form__wrap-${wrapClass}`]: true,
          ...context.addClasses
        }
      },
      [...elems, errorElem()]
    );
  },
  mixins: [addClasses],
  props: {
    wrapClass: {
      type: String,
      default: ""
    },
    val: {
      type: Object,
      required: true
    },
    value: {
      // type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    legend: {
      type: String,
      default: ""
    },
    label: {
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
  }
};
