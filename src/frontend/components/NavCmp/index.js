import MainMenu from "./MainMenu";
import SocialMenu from "./SocialMenu";

import { mapGetters } from "vuex";

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
      default: true
    }
  },
  computed: {
    ...mapGetters(["config"]),
    classes() {
      if (this.inHeader) {
        return {
          nav: true,
          header__nav: true,
          "header__nav-fixed": this.config.isContent
        };
      }

      return {
        col: true,
        "col-tb_float": true,
        "col-tb_6": true,
        "col-ds_5": true,
        "col-xds_4": true,
        footer_top__col: true,
        nav: true,
        footer_top__nav: true
      };
    }
  },
  methods: {
    checkerElem() {
      return (
        <a
          id="menu_checker"
          class="header__menu_checker header__menu_checker-open"
          href="#"
        >
          <div class="header__menu_checker_line" />
          <div class="header__menu_checker_line" />
          <div class="header__menu_checker_line" />
        </a>
      );
    },
    mainMenuElem() {
      return <MainMenu inHeader={this.inHeader} />;
    },
    socialMenuElem() {
      return <SocialMenu inHeader={this.inHeader} />;
    }
  }
};
