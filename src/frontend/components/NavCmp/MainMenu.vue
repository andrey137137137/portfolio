<template lang="pug">
.menu(:id='id', :class='containerClasses')
  router-link.menu-link(
    v-for='link in links',
    :key='link.path',
    :class='linkClasses',
    :to='link.path'
  ) {{ link.meta.title }}
</template>

<script>
import { ROOT, HOME } from '@common/constants/router';
import exist from '@common/helpers/exist';
import getRoutesMixin from '@common/mixins/getRoutesMixin';

export default {
  name: 'MainMenu',
  mixins: [getRoutesMixin],
  props: {
    inHeader: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isContent() {
      return this.$route.name != HOME.name;
    },
    restPages() {
      return this.getRoutes(
        item => item.path == ROOT && exist('children', item),
      )[0].children;
    },
    links() {
      if (this.inHeader) return this.restPages;
      return [
        ...this.restPages,
        {
          meta: { title: 'Главная' },
          path: HOME.path,
        },
      ];
    },
    id() {
      return this.inHeader && this.isContent ? 'main_menu' : '';
    },
    containerClasses() {
      if (!this.inHeader) return { 'footer_top-menu': true };
      return {
        'header-menu': true,
        'header-menu--absolute': this.isContent,
        'header-menu--float': !this.isContent,
      };
    },
    linkClasses() {
      if (!this.inHeader) return {};
      return {
        'section-title': this.isContent,
        'section-title--large': this.isContent,
        'section-title--underlined': this.isContent,
        btn: !this.isContent,
      };
    },
  },
};
</script>
