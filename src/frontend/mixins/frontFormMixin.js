import formMixin from "@common/mixins/formMixin";
import errorElemMixin from "@common/mixins/errorElemMixin";

export default {
  mixins: [formMixin, errorElemMixin],
  data() {
    return {
      error: {
        value: "",
        type: ""
      },
      $errorComp: null,
      $inputElem: null,
      marginTop: 10
    };
  },
  methods: {
    showError(name) {
      const $inputComp = this.$refs[name];

      this.error.value = $inputComp.value;
      this.error.type = $inputComp.type;
      this.$inputElem = $inputComp.$el;

      this.isError = this.$v.$invalid;
      this.$errorComp.$el.style.top =
        this.$inputElem.offsetTop + this.$inputElem.offsetHeight + "px";
    },
    touchInvalidElem() {
      const elemName = this.returnInvalidElem();

      if (!elemName) return true;

      this.$v[elemName].$touch();
      this.showError(elemName);

      return false;
    }
  },
  mounted() {
    this.$errorComp = this.$refs["errorElem"];
    console.log(this.$errorComp);
  }
};
