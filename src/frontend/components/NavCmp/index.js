import MainMenu from "./MainMenu";
import SocialMenu from "./SocialMenu";

export default {
  name: "NavCmp",
  render(h) {
    const elems = [];

    if (this.inHeader) {
      elems.push(this.socialMenuElem(h));

      if (this.isContent) {
        elems.push(this.checkerElem(h));
      } else {
        elems.push(this.mainMenuElem(h));
      }
    } else {
      elems.push(this.mainMenuElem(h));
      elems.push(this.socialMenuElem(h));
    }

    return h("nav", { class: this.classes }, elems);
  },
  props: {
    inHeader: {
      type: Boolean,
      default: true
    },
    isContent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      if (this.inHeader) {
        return {
          nav: true,
          header__nav: true,
          "header__nav-fixed": this.isContent
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
      return <MainMenu inHeader={this.inHeader} isContent={this.isContent} />;
    },
    socialMenuElem() {
      return <SocialMenu inHeader={this.inHeader} isContent={this.isContent} />;
    }
  }
};
