export default {
  name: "HeaderTitle",
  render(h) {
    return h("div", {}, [this.titleElem(h), this.descElem(h)]);
  },
  props: {
    isRelative: {
      type: Boolean,
      default: true
    },
    isLarge: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
    }
  },
  methods: {
    titleElem(h) {
      const level = this.isLarge ? 1 : 2;
      console.log(`h${level}`);

      return h(
        `h${level}`,
        {
          class: {
            section__title: true,
            header__title: true,
            ...this.titleClass
          }
        },
        [this.slots]
      );
    },
    descElem() {
      return (
        <p
          class={{ section__desc: true, header__desc: true, ...this.descClass }}
        >
          <slot />
        </p>
      );
    }
  }
};
