<script>
import TitleWrapper from "@frontCmp/TitleWrapper";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "TopWrapper",
  render(h) {
    const wrapperElem = this.config.isTopWrapTitle ? "section" : "div";
    const elems = [this.cornerBorderElem()];

    if (this.config.isTopWrapTitle) {
      elems.push(this.titleWrapperElem());
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
    }
  },
  methods: {
    cornerBorderElem() {
      return <div class={this.cornerBorderClasses} />;
    },
    titleWrapperElem() {
      return (
        <TitleWrapper
          title={this.config.name}
          containerAddClass="top_wrap__title_wrap"
        />
      );
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/TopWrapper.scss">
</style>
