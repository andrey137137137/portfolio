<template lang="pug">
  header.section.header
    .container
      router-link.header__link(to='/') Вернуться на сайт
      h2.section__title.header__title Панель администрирования
</template>

<script>
export default {
  name: "AdminHeader"
};
</script>

<style lang="scss" src="../styles/cmp/AdminHeader.scss">
</style>
