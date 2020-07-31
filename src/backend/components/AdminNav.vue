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
  // data() {
  //   return {
  //     tabs: [
  //       { meta: { title: 'Обо мне' }, path: '/admin/about' },
  //       { meta: { title: 'Блог' }, path: '/admin/blog' },
  //       { meta: { title: 'Мои работы' }, path: '/admin/works' },
  //       { meta: { title: 'Личные данные' }, path: '/admin/profile' },
  //       {
  //         meta: { title: 'Имя пользователя и email' },
  //         path: '/admin/authConfig',
  //       },
  //     ],
  //   };
  // },
  computed: {
    tabs() {
      return this.getRoutes(
        item => item.path == ADMIN && exist('children', item),
      )[0].children;
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
