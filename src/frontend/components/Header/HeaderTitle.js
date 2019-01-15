import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "HeaderTitle",
  render(h) {
    return h("div", {}, [this.titleElem(h), this.descElem(h)]);
  },
  computed: {
    ...mapGetters(["config"]),
    isRelative() {
      return this.config.isContent;
    },
    isLarge() {
      return this.config.isBlog;
    },
    titleClass() {
      if (!this.isRelative) {
        return {};
      }

      return {
        "section__title-large": this.isLarge,
        "header__title-relative": true,
        "header__title-medium": !this.isLarge,
        "header__title-large": this.isLarge
      };
    },
    descClass() {
      if (!this.isRelative) {
        return {};
      }

      return {
        "header__desc-relative": true,
        "header__desc-after_medium_title": !this.isLarge,
        "header__desc-after_large_title": this.isLarge
      };
    },
    title() {
      return this.config.isBlog ? "Блог" : "Банников Андрей";
    },
    desc() {
      return this.config.isBlog
        ? "Статьи, которые я написал"
        : "Личный сайт веб разработчика";
    }
  },
  methods: {
    titleElem(h) {
      const level = this.isLarge ? 1 : 2;

      return h(
        `h${level}`,
        {
          class: {
            section__title: true,
            header__title: true,
            ...this.titleClass
          }
        },
        [this.title]
      );
    },
    descElem() {
      return (
        <p
          class={{ section__desc: true, header__desc: true, ...this.descClass }}
        >
          {this.desc}
        </p>
      );
    }
  }
};
