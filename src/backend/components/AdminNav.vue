<template lang="pug">
nav.admin_nav
  .admin_nav-item(v-for='tab in tabs', :key='tab.path')
    router-link.btn.admin_nav-link(
      :class='isActiveClass(tab.path)',
      :to='tab.path'
    ) {{ tab.meta.title }}
</template>

<script>
import { ADMIN } from '@common/constants/router.js';
import exist from '@common/helpers/exist';
import getRoutesMixin from '@common/mixins/getRoutesMixin';

export default {
  name: 'AdminNav',
  mixins: [getRoutesMixin],
  computed: {
    tabs() {
      const routes = this.getRoutes(
        item => item.path == ADMIN && exist('children', item),
      )[0].children;

      return routes.map(route => {
        route.path = `${ADMIN}/${route.path}`;
        return route;
      });
    },
  },
  methods: {
    isActiveClass(path) {
      return {
        'nav-link--active': this.$route.path === path,
      };
    },
  },
};
</script>

<style lang="scss">
@import '@backStylesCmp/AdminNav.scss';
</style>
