<template lang="pug">
  div
    TopWrapper
      aside.tabs
        #scroll_menu.container.tabs-container
          a.tabs-link(
            v-for="post in dbData"
            :key="post._id"
            :href="getTabLink(post._id)") {{post.title}}

      main.section.blog
        .container.blog-container

          article.blog-post(
            v-for="(post, index) in dbData"
            :key="post._id"
            :id="post._id"
          )
            h3.section-title.blog-title {{post.title}}
            span.blog-date {{post.date}}
            p {{post.body}}

            .blog-separator(v-show="index < dbData.length - 1")

</template>

<script>
import pageConfig from "@frontend/mixins/pageConfig";
import TopWrapper from "@frontCmp/TopWrapper";

export default {
  name: "BlogView",
  components: {
    TopWrapper
  },
  mixins: [pageConfig],
  methods: {
    getTabLink(name) {
      return `#${name}`;
    }
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Blog/import.scss"></style>
