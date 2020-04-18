import MainMenu from "./MainMenu";
import SocialMenu from "./SocialMenu";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "NavCmp",
  render(h) {
    const elems = [];

    if (this.inHeader) {
      elems.push(this.socialMenuElem());

      if (this.config.isContent) {
        elems.push(this.checkerElem());
      } else {
        elems.push(this.mainMenuElem());
      }
    } else {
      elems.push(this.mainMenuElem());
      elems.push(this.socialMenuElem());
    }

    return h("nav", { class: this.classes }, elems);
  },
  props: {
    inHeader: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(["config"]),
    classes() {
      if (this.inHeader) {
        return {
          nav: true,
          "header-nav": true,
          "header-nav--fixed": this.config.isContent,
        };
      }

      return {
        col: true,
        "col--tb_float": true,
        "col--tb_6": true,
        "col--ds_5": true,
        "col--xds_4": true,
        "footer_top-col": true,
        nav: true,
        "footer_top-nav": true,
      };
    },
  },
  methods: {
    checkerElem() {
      return (
        <a
          id="menu_checker"
          class="header-menu_checker header-menu_checker--open"
          href="#"
        >
          <div class="header-menu_checker_line" />
          <div class="header-menu_checker_line" />
          <div class="header-menu_checker_line" />
        </a>
      );
    },
    mainMenuElem() {
      return <MainMenu inHeader={this.inHeader} />;
    },
    socialMenuElem() {
      return <SocialMenu inHeader={this.inHeader} />;
    },
  },
};
