export default {
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
      if (!this.$v.$invalid) return true;

      for (const key in this.$v) {
        if (
          this.$v.hasOwnProperty(key) &&
          key.slice(0, 1) !== "$" &&
          this.$v[key].$invalid
        ) {
          this.$v[key].$touch();
          this.setPosition(key);
          return false;
        }
      }
    }
  }
};
