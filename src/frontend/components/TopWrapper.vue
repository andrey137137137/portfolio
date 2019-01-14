<script>
import SvgCmp from "@components/SvgCmp";

import { mapGetters } from "vuex";

export default {
  name: "TopWrapper",
  render(h) {
    const wrapperElem = this.title ? "section" : "div";
    const elems = [h("div", { class: this.cornerBorderClasses })];

    if (this.title) {
      elems.push(this.titleWrapper);
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
    titleWrapper() {
      return (
        <div class="title_wrap top_wrap__title_wrap">
          <SvgCmp id="stars2" addClasses={{ title_wrap__bg: true }} />
          <h1 class="section__title section__title-large title_wrap__title">
            {this.title}
          </h1>
        </div>
      );
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/TopWrapper.scss">
</style>
