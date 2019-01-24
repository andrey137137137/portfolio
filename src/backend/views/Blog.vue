<template lang="pug">
  .container
    h1.section__title Страница "Блог"

    PostForm(
      v-for="post in dbData"
      :key="post._id"
      :post="post")

    h3.form__legend Добавить запись
    PostForm(:isNew="true")
</template>

<script>
import pageConfig from "@backend/mixins/pageConfig";
import PostForm from "@backCmp/Forms/PostForm";

export default {
  name: "AdminBlogView",
  components: {
    PostForm
  },
  mixins: [pageConfig],
  data() {
    return {
      dbPage: "post"
    };
  }
};
</script>
