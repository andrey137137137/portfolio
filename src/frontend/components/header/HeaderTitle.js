import { HOME, BLOG } from '@common/constants/router';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'HeaderTitle',
  render(h) {
    return h('div', {}, [this.titleElem(h), this.descElem()]);
  },
  computed: {
    ...mapGetters(['firstName', 'lastName']),
    isContent() {
      return this.$route.name != HOME.name;
    },
    isBlog() {
      return this.$route.name == BLOG;
    },
    titleClasses() {
      if (!this.isContent) {
        return {};
      }

      return {
        'section-title--large': this.isBlog,
        'header-title--relative': true,
        'header-title--medium': !this.isBlog,
        'header-title--large': this.isBlog,
      };
    },
    descClasses() {
      if (!this.isContent) {
        return {};
      }

      return {
        'header-desc--relative': true,
        'header-desc--after_medium_title': !this.isBlog,
        'header-desc--after_large_title': this.isBlog,
      };
    },
    title() {
      return this.isBlog
        ? this.$route.meta.title
        : `${this.lastName} ${this.firstName}`;
    },
    desc() {
      return this.isBlog
        ? 'Статьи, которые я написал'
        : 'Личный сайт веб разработчика';
    },
  },
  methods: {
    titleElem(h) {
      // const level = this.isBlog ? 1 : 2;

      return h(
        `h${this.isBlog ? 1 : 2}`,
        {
          class: {
            'section-title': true,
            'header-title': true,
            ...this.titleClasses,
          },
        },
        [this.title],
      );
    },
    descElem() {
      return (
        <p
          class={{
            'section-desc': true,
            'header-desc': true,
            ...this.descClasses,
          }}
        >
          {this.desc}
        </p>
      );
    },
  },
};
