import { exist } from '@apiHelpers';
import types from '@common/constants/validation/types';
import errors from '@common/constants/validation/errors';
import addClassesMixin from '@common/mixins/addClassesMixin';
import ErrorElem from '@components/formElems/ErrorElem';

import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex';
const mapFrontFormErrorActions =
  createNamespacedHelpers('frontFormError').mapActions;

export default {
  mixins: [addClassesMixin],
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

    let elems = [];

    if (!exist(0, this.values)) {
      elems = this.getBaseElems(h);
    } else {
      const $vm = this;
      this.values.forEach((item, index) => {
        // $vm.curIndex = index;
        elems.push($vm.getBaseElems(h, index));
      });
    }

    if (this.subWrapClass) {
      elems = [h('div', { class: this.subWrapClass }, elems)];
    }

    return h(
      'div',
      {
        class: {
          'form-wrap': true,
          [`form-wrap--${wrapClass}`]: true,
          ...this.compClasses,
        },
      },
      !this.isFront && this.isRequiredInput
        ? [...elems, this.errorElem()]
        : elems,
    );
  },
  props: {
    name: { type: String, default: '' },
    wrapClass: { type: String, default: '' },
    subWrapClass: { type: [String, Object], default: '' },
    addInputClasses: {
      type: Object,
      default() {
        return {};
      },
    },
    val: {
      type: Object,
      default() {
        return {};
      },
    },
    type: { type: String, default: 'text' },
    label: { type: String, default: '' },
    errorMessage: { type: String, default: '' },
    value: {
      type: [String, Number, Boolean],
      default: '',
    },
    values: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // curIndex: -1,
      classes: {
        block: 'form',
        elem: 'input',
        modifs: {
          required: 'required',
          error: 'error',
          valid: 'valid',
        },
      },
    };
  },
  computed: {
    ...mapGetters(['message']),
    // areManyInputs() {
    //   return this.curIndex >= 0;
    // },
    isFront() {
      return this.$route.meta.isFront;
    },
    isEmptyRequired() {
      return this.val.$error && !this.value;
    },
    error() {
      if (this.isEmptyRequired) {
        if (this.type == types.native.radio) {
          for (let index = 0; index < this.values.length; index++) {
            const item = this.values[index];
            if (item.value == this.val.$model && exist('errorMessage', item)) {
              return item.errorMessage;
            }
          }
        }

        if (this.errorMessage) {
          return this.errorMessage;
        }

        return errors['required'];
      }

      if (!this.val.$error) {
        return '';
      }

      return exist(this.type, errors) ? errors[this.type] : errors.other;
    },
    isRequiredInput() {
      switch (this.type) {
        case types.native.checkbox:
        case types.custom.textarea:
        case types.custom.toggle:
          return exist('$error', this.val);
        default:
          return true;
      }
    },
    validationClasses() {
      const baseClass = `${this.classes.block}-${this.classes.elem}--`;

      return {
        [baseClass + this.classes.modifs.error]: this.val.$error,
        [baseClass + this.classes.modifs.valid]: !this.val.$invalid,
      };
    },
  },
  methods: {
    ...mapActions(['setFormMessage']),
    ...mapFrontFormErrorActions(['setFormError']),
    getValueOption(index, name) {
      return index >= 0 ? this.values[index][name] : false;
    },
    elemsBeforeInput() {
      return [];
    },
    elemsAfterInput() {
      return [];
    },
    isWrapper() {
      return exist('wrapInput', this);
    },
    getBaseElems(h, index = -1) {
      let elems = [
        ...this.elemsBeforeInput(h),
        this.inputElem(h, index),
        ...this.elemsAfterInput(h, index),
      ];

      if (this.isWrapper()) {
        elems = this.wrapInput(h, elems, index);
      }

      return elems;
    },
    handle(e) {
      let eventName;
      let value;

      if (this.message) {
        this.setFormMessage({ status: 0, message: '' });
      }

      switch (this.type) {
        case 'checkbox':
        case 'radio':
          eventName = 'change';
          break;
        default:
          eventName = 'input';
      }

      switch (this.type) {
        case 'checkbox':
          value = e.target.checked;
          break;
        default:
          value = e.target.value;
      }

      this.$emit(eventName, value);

      if (this.isRequiredInput) {
        this.$nextTick(function () {
          this.touchHandle();
        });
      }
    },
    touchHandle() {
      this.val.$touch();
      if (this.isFront) {
        this.setFormError({ inputName: this.name, error: this.error });
      }
    },
    errorElem() {
      return <ErrorElem message={this.error} />;
    },
    inputElem(h, index) {
      const inputOptions = index >= 0 ? this.values[index] : false;
      const on = {
        input: this.handle,
      };
      const attrs = {
        name: this.name,
        placeholder: inputOptions ? inputOptions.placeholder : this.placeholder,
      };
      let classes = {
        'form-input': true,
        ...(inputOptions ? inputOptions.addInputClasses : this.addInputClasses),
      };
      let formElem = '';

      if (this.type === 'textarea') {
        formElem = this.type;
      } else {
        formElem = 'input';
        attrs.type = this.type;
      }

      if (this.isRequiredInput) {
        classes = {
          ...classes,
          ...this.validationClasses,
        };
        on.blur = this.touchHandle;
      }

      return h(formElem, {
        class: classes,
        attrs,
        domProps: {
          value: inputOptions ? inputOptions.value : this.value,
        },
        on,
      });
    },
  },
};
