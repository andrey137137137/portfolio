import formMixin from "@common/mixins/formMixin";
import errorElemMixin from "@common/mixins/errorElemMixin";

import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("frontFormError");

export default {
  mixins: [formMixin, errorElemMixin],
  computed: {
    ...mapGetters(["formInputName", "formError"]),
    errorStyleTop() {
      if (!this.formInputName) return 0;

      const $inputElem = this.$refs[this.formInputName].$el;

      return $inputElem.offsetTop + $inputElem.offsetHeight;
    }
  },
  methods: {
    ...mapActions(["setFormError"]),
    touchInvalidElem() {
      const elemName = this.returnInvalidElem();

      if (!elemName) {
        return true;
      }

      // console.log(this.$event);
      // this.$v[elemName].$touch();
      this.$refs[elemName].handle();

      return false;
    }
  }
};
