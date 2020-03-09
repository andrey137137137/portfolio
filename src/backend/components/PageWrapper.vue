<template lang="pug">
  .container
    h1.section__title.section__main_title.main__big_title {{title}}
    slot
</template>

<script>
export default {
  name: "PageWrapper",
  props: {
    isAuth: {
      type: Boolean,
      default: true
    },
    page: {
      type: String,
      default: ""
    }
  },
  computed: {
    title() {
      return !this.isAuth ? "Вы не авторизированы!" : `Страница "${this.page}"`;
    }
  }
};
</script>
