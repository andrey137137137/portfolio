<script>
import TitleWrapper from "@frontCmp/TitleWrapper";

import { mapGetters } from "vuex";

export default {
  name: "TopWrapper",
  render(h) {
    const { name, isTopWrapTitle } = this.config;
    const wrapperElem = isTopWrapTitle ? "section" : "div";
    const elems = [<div class={this.cornerBorderClasses} />];

    if (isTopWrapTitle) {
      elems.push(<TitleWrapper title={name} addClasses={this.titleClasses} />);
    }

    elems.push(this.$slots.default);

    return h(wrapperElem, { class: ["section", "top_wrap"] }, elems);
  },
  computed: {
    ...mapGetters(["config"]),
    cornerBorderClasses() {
      const { isBlog, isTopWrapTitle } = this.config;

      return {
        top_wrap__corner_border: true,
        "top_wrap__corner_border-half_opacity": isTopWrapTitle,
        "top_wrap__corner_border-two_colors": !isTopWrapTitle && !isBlog,
        "top_wrap__corner_border-beige": !isTopWrapTitle && isBlog
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
