import formMixin from "@common/mixins/formMixin";

export default {
  mixins: [formMixin],
  data() {
    return {
      error: "",
      $errorElem: null,
      $input: null,
      marginTop: 10
    };
  },
  methods: {
    set(value) {
      this.error = value;
    },
    delete() {
      this.error = "";
    },
    setPosition(name) {
      this.$input = this.$refs[name].$el;
      console.log(this.$input.offsetTop);
      this.$errorElem = this.$refs["errorElem"].$el;
      this.$errorElem.style.top =
        this.$input.offsetTop + this.$input.offsetHeight + "px";
    },
    touchInvalidElem() {
      const elemName = this.returnInvalidElem();

      if (!elemName) return true;

      this.$v[elemName].$touch();
      this.setPosition(elemName);

      return false;
    }
  }
};
