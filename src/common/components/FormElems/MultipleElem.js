import InputEventElem from "@components/FormElems/InputEventElem";

export default {
  name: "MultipleElem",
  components: {
    InputEventElem
  },
  render(h) {
    let elems = [];

    for (const valIndex in this.vals) {
      if (this.vals.hasOwnProperty(valIndex)) {
        this.fields.forEach(field => {
          elems.push(
            this.inputEvElem(
              h,
              valIndex,
              this.vals[valIndex],
              field.name,
              field.type,
              field.placeholder
            )
          );
        });
      }
    }

    return h("div", {}, [...elems.map(elem => elem), this.navElem(h)]);
  },
  props: {
    vals: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    propTemplate: {
      type: Object,
      required: true
    }
  },
  methods: {
    getIndex(index) {
      return parseInt(index) + 1;
    },
    inputEvElem(h, index, val, fieldName, type, placeholder) {
      const self = this;

      return h("InputEventElem", {
        props: {
          type,
          value: val[fieldName].$model,
          val: val[fieldName],
          placeholder: `${placeholder} ${this.getIndex(index)}`
        },
        on: {
          input: value => {
            self.items[index][fieldName] = value;
            val.$touch();
            self.$emit("input", value);
          }
        }
      });
    },
    removeItem() {
      this.items.pop();
    },
    addItem() {
      const template = {};

      for (const key in this.propTemplate) {
        if (this.propTemplate.hasOwnProperty(key)) {
          template[key] = this.propTemplate[key];
        }
      }

      this.items.push(template);
    },
    navElem(h) {
      return h("div", { class: "menu" }, [
        h("button", {
          class: "btn",
          on: { click: this.removeItem },
          domProps: { innerHTML: "Remove" }
        }),
        h("button", {
          class: "btn",
          on: { click: this.addItem },
          domProps: { innerHTML: "Add" }
        })
      ]);
    }
  }
};
