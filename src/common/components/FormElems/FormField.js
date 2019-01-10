// import types from "@/common/constants/validation/types";
import addClasses from "@/common/mixins/addClasses";
import ErrorElem from "@/common/components/FormElems/ErrorElem";

export default {
  render(h) {
    const wrapClass = this.wrapClass ? this.wrapClass : this.type;
    let elems = [];

    if (this.label && wrapClass !== "checkbox") {
      if (wrapClass === "icon_label") {
        elems.push(this.iconLabelElem());
      } else {
        elems.push(this.labelElem());
      }
    }

    elems.push(this.inputElem(h));

    if (this.measure) {
      elems.push(this.measureElem());
    }

    switch (this.type) {
      case "checkbox":
        elems.push(this.checkedElem());
        elems.push(this.checkboxTextElem());
        elems = [h("label", { class: "form__label" }, elems)];
        break;
      default:
        if (wrapClass === "icon_label" || this.type === "number") {
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
          ...this.addClasses
        }
      },
      [...elems, this.errorElem(h)]
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
  },
  data() {
    return {
      classes: {
        block: "form",
        elem: "input",
        modifs: {
          required: "required",
          error: "error",
          valid: "valid"
        }
      }
    };
  },
  computed: {
    // state: {
    //   get() {
    //     return this.value;
    //   },
    //   set(value) {
    //     this.val.$touch();
    //     let eventType;

    //     switch (this.type) {
    //       case types.native.checkbox:
    //         eventType = "box-checked";
    //         break;
    //       case types.native.radio:
    //         eventType = "radio-changed";
    //         break;
    //       default:
    //         eventType = "input";
    //     }

    //     this.$emit(eventType, value);
    //   }
    // },
    // getType() {
    //   return this.type;
    // },
    isEmptyRequired() {
      // return this.val.$error && !this.state;
      return this.val.$error && !this.value;
    },
    errorType() {
      if (this.isEmptyRequired) {
        return "required";
      }

      if (this.val.$error) {
        return this.type;
      }

      return "";
    },
    validationClass() {
      const baseClass = `${this.classes.block}__${this.classes.elem}-`;

      return {
        [baseClass + this.classes.modifs.error]: this.val.$error,
        [baseClass + this.classes.modifs.valid]: !this.val.$invalid
      };
    }
  },
  methods: {
    labelElem() {
      return <label class="form__label">{this.label}</label>;
    },
    iconLabelElem() {
      return <label class="form__label" />;
    },
    checkedElem() {
      return <div class="form__checked" />;
    },
    checkboxTextElem() {
      return <div class="form__checkbox_text">{this.label}</div>;
    },
    errorElem() {
      return <ErrorElem type={this.errorType} />;
    },
    measureElem() {
      return <span class="form__measure">{this.measure}</span>;
    },
    inputElem(h) {
      const self = this;
      const attrs = {
        placeholder: this.placeholder
      };
      let formElem = "";

      if (this.type === "textarea") {
        formElem = this.type;
      } else {
        formElem = "input";
        attrs.type = this.type;
      }

      return h(formElem, {
        class: {
          form__input: true,
          ...this.validationClass
        },
        attrs,
        domProps: {
          value: this.value
        },
        on: {
          input(e) {
            self.val.$touch();
            self.$emit("input", e.target.value);
          }
        },
        nativeOn: {
          blur: this.val.$touch()
        }
      });
    }
  }
};
