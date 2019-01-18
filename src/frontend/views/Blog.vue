<template lang="pug">
  PageWrapper
    TopWrapper
      aside.tabs
        #scroll_menu.container.tabs__container
          a.tabs__link(
            v-for="post in dbData"
            :key="post._id"
            :href="getTabLink(post._id)") {{post.title}}

      main.section.blog
        .container.blog__container

          article.blog__post(
            v-for="(post, index) in dbData"
            :key="post._id"
            :id="post._id"
          )
            h3.section__title.blog__title {{post.title}}
            span.blog__date {{post.date}}
            p {{post.body}}

            .blog__separator(v-show="index < dbData.length - 1")

</template>

<script>
import pageConfig from "@frontend/mixins/pageConfig";
import PageWrapper from "@frontCmp/PageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";

export default {
  name: "BlogView",
  components: {
    PageWrapper,
    TopWrapper
  },
  mixins: [pageConfig],
  data() {
    return {
      dbPage: "post",
      configParams: {
        name: "Блог",
        isBlog: true,
        isContent: true,
        sections: 2
      }
    };
  },
  methods: {
    getTabLink(name) {
      return `#${name}`;
    }
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Blog.scss">
</style>
