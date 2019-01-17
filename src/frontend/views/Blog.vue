<template lang="pug">
  PageWrapper
    TopWrapper
      aside.tabs
        #scroll_menu.container.tabs__container
          a.tabs__link.tabs__link-active(href="#") Самое важное в SASS
          a.tabs__link(href="#") Самый необходимый набор Gulp плагинов
          a.tabs__link(href="#") Почему я выбрал Jade
          a.tabs__link(href="#") Пост 4
          a.tabs__link(href="#") Пост 5
          a.tabs__link(href="#") Пост 6
          a.tabs__link(href="#") Приёмы в вёрстке, без которых не обходится ни один сайт

      main.section.blog
        .container.blog__container

          each post in posts

            article.blog__post
              
              h3.section__title.blog__title= post.title

              span.blog__date= post.date

              p= post.body

              //- .code
              //-   ol.code__list
              //-     -
              //-       var code_list = [
              //-         '// присвоить',
              //-         '$(document).data(\'prop\', { anything: "любой объект" })',
              //-         '',
              //-         '// прочитать',
              //-         'alert( $(document).data(\'prop\', { anything: "любой объект" }) )'
              //-       ]
              //-     each item in code_list
              //-       li.clearfix.code__item
              //-         code.code__text= item

              //- img(width="300" height="104" src="userfiles/code.jpg" alt="" style="display: block; width: 300px; height: 104px;")

            .blog__separator

</template>

<script>
import PageWrapper from "@frontCmp/PageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";

import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("frontView");

export default {
  name: "BlogView",
  components: {
    PageWrapper,
    TopWrapper
  },
  methods: {
    ...mapActions(["setConfig"])
  },
  created() {
    this.setConfig({
      name: "Блог",
      isBlog: true,
      isContent: true,
      sections: 2
    });
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Blog.scss">
</style>
