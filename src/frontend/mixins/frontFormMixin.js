import formMixin from "@common/mixins/formMixin";
import errorElemMixin from "@common/mixins/errorElemMixin";

import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("frontFormError");

export default {
  mixins: [formMixin, errorElemMixin],
  computed: {
    ...mapGetters(["formInputName", "formError"])
  },
  methods: {
    ...mapActions(["setFormError"]),
    errorStyleTop() {
      const $inputElem = this.$refs[this.formInputName].$el;
      return $inputElem.offsetTop + $inputElem.offsetHeight;
    },
    touchInvalidElem() {
      const elemName = this.returnInvalidElem();

      if (!elemName) {
        return true;
      }

      // this.$v[elemName].$touch();
      this.$refs[elemName].$emit("handle");

      return false;
    }
  }
};
