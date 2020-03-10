<template lang="pug">
  .container
    h1.section__title.section__main_title.main__big_title {{title}}
    slot
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("auth");

export default {
  name: "PageWrapper",
  props: {
    page: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["isAuth"]),
    title() {
      return !this.isAuth ? "Вы не авторизированы!" : `Страница "${this.page}"`;
    }
  }
};
</script>
