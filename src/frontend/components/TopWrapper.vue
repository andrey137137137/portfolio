<script>
import TitleWrapper from "@frontCmp/TitleWrapper";

import { mapGetters } from "vuex";

export default {
  name: "TopWrapper",
  render(h) {
    const wrapperElem = this.title ? "section" : "div";
    const elems = [h("div", { class: this.cornerBorderClasses })];

    if (this.title) {
      elems.push(
        <TitleWrapper title={this.title} addClasses={this.titleClasses} />
      );
    }

    return h(wrapperElem, { class: ["section", "top_wrap"] }, elems);
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["config"]),
    cornerBorderClasses() {
      return {
        top_wrap__corner_border: true,
        "top_wrap__corner_border-half_opacity": this.title,
        "top_wrap__corner_border-two_colors":
          !this.title && !this.config.isBlog,
        "top_wrap__corner_border-beige": !this.title && this.config.isBlog
      };
    },
    titleClasses() {
      return {
        top_wrap__title_wrap: true
      };
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/TopWrapper.scss">
</style>
