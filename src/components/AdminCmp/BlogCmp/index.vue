<template lang="pug">
  .container
    h1.section__title Страница "Блог"

    PostForm(
      v-for="post in posts"
      :key="post._id"
      :post="post")

    h3.form__legend Добавить запись
    PostForm(:isNew="true")
</template>

<script>
import PostForm from "@/components/AdminCmp/BlogCmp/PostForm";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "BlogCmp",
  components: { PostForm },
  computed: {
    ...mapGetters(["posts"])
  },
  methods: {
    ...mapActions(["getPosts"])
  },
  mounted() {
    this.getPosts();
  }
};
</script>
