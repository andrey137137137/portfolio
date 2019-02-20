<template lang="pug">
  nav.nav
    .nav__item(v-for="tab in tabs" :key="tab.href")
      router-link.btn.nav__link(
        :class="isActiveClass(tab.href)"
        :to="tab.href"
      ) {{tab.name}}
</template>

<script>
export default {
  name: "AdminNav",
  data() {
    return {
      tabs: [
        { name: "Обо мне", href: "/admin/about" },
        { name: "Блог", href: "/admin/blog" },
        { name: "Мои работы", href: "/admin/works" },
        { name: "Личные данные", href: "/admin/user" }
      ]
    };
  },
  methods: {
    isActiveClass(path) {
      return {
        "nav__link-active": this.$route.path === path
      };
    }
  }
};
</script>

<style lang="scss" src="@backStylesCmp/AdminNav.scss" scoped></style>
