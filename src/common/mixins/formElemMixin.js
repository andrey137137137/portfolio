import types from "@common/constants/validation/types";
import exist from "@common/helpers/exist";
import addClassesMixin from "@common/mixins/addClassesMixin";
import errorElemMixin from "@common/mixins/errorElemMixin";
import ErrorElem from "@components/formElems/ErrorElem";

import { mapGetters, mapActions, createNamespacedHelpers } from "vuex";
const mapFrontFormErrorActions = createNamespacedHelpers("frontFormError")
  .mapActions;

export default {
  mixins: [addClassesMixin, errorElemMixin],
  render(h) {
    let wrapClass = this.wrapClass;

    if (!wrapClass) {
      switch (this.type) {
        case types.native.checkbox:
        case types.native.radio:
        case types.native.number:
        case types.custom.textarea:
          wrapClass = this.type;
          break;
        default:
          wrapClass = types.native.text;
      }
    }

    let elems = [
      ...this.elemsBeforeInput(h),
      this.inputElem(h),
      ...this.elemsAfterInput(h)
    ];

    if (this.isWrapper()) {
      elems = this.wrapInput(h, elems);
    }

    return h(
      "div",
      {
        class: {
          "form-wrap": true,
          [`form-wrap--${wrapClass}`]: true,
          ...this.addClasses
        }
      },
      !this.$route.meta.isFront && this.isRequiredInput
        ? [...elems, this.errorElem()]
        : elems
    );
  },
  props: {
    wrapClass: {
      type: String,
      default: ""
    },
    addInputClasses: {
      type: Object,
      default() {
        return {};
      }
    },
    val: {
      type: Object,
      default() {
        return {};
      }
    },
    value: {
      // type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    label: {
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
    ...mapGetters(["message"]),
    isRequiredInput() {
      switch (this.type) {
        case types.native.checkbox:
        case types.custom.textarea:
        case types.custom.toggle:
          return exist("$error", this.val);
        default:
          return true;
      }
    },
    validationClasses() {
      const baseClass = `${this.classes.block}-${this.classes.elem}--`;

      return {
        [baseClass + this.classes.modifs.error]: this.val.$error,
        [baseClass + this.classes.modifs.valid]: !this.val.$invalid
      };
    }
  },
  methods: {
    ...mapActions(["setFormMessage"]),
    ...mapFrontFormErrorActions(["setFormError"]),
    elemsBeforeInput() {
      return [];
    },
    elemsAfterInput() {
      return [];
    },
    isWrapper() {
      return exist("wrapInput", this);
    },
    handle(e) {
      let event;
      let value;

      // console.log(this);

      if (this.message) this.setFormMessage({ status: 0, message: "" });

      switch (this.type) {
        case "checkbox":
          event = "change";
          value = e.target.checked;
          break;

        default:
          event = "input";
          value = e.target.value;
      }

      if (this.isRequiredInput) {
        this.touchHandle();
      }

      this.$emit(event, value);
    },
    touchHandle() {
      if (this.$route.meta.isFront) {
        // this.isError = this.val.$error;
        this.setFormError({ inputName: "", error: this.error });
      }

      this.val.$touch();
    },
    errorElem() {
      // this.isError = this.val.$error;
      return <ErrorElem message={this.error} />;
    },
    inputElem(h) {
      const on = {
        input: this.handle
      };
      const attrs = {
        placeholder: this.placeholder
      };
      let classes = {
        "form-input": true,
        ...this.addInputClasses
      };
      let formElem = "";

      if (this.type === "textarea") {
        formElem = this.type;
      } else {
        formElem = "input";
        attrs.type = this.type;
      }

      if (this.isRequiredInput) {
        classes = {
          ...classes,
          ...this.validationClasses
        };
        on.blur = this.touchHandle;
      }

      return h(formElem, {
        class: classes,
        attrs,
        domProps: {
          value: this.value
        },
        on
      });
    }
  }
};
