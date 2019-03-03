<template lang="pug">
  PageWrapper(title="Блог")
    PostForm(
      v-for="post in dbData"
      :key="post._id"
      :item="post")
    h3.form__legend Добавить запись
    PostForm
</template>

<script>
import pageData from "@backend/mixins/pageData";
import PageWrapper from "@backCmp/PageWrapper";
import PostForm from "@backCmp/Forms/PostForm";

export default {
  name: "AdminBlogView",
  components: {
    PageWrapper,
    PostForm
  },
  mixins: [pageData]
};
</script>
