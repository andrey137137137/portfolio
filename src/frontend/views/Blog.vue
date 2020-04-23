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
import $ from "jquery";
import pageConfig from "@frontend/mixins/pageConfig";
import TopWrapper from "@frontCmp/TopWrapper";

export default {
  name: "BlogView",
  components: {
    TopWrapper
  },
  mixins: [pageConfig],
  data() {
    return {
      // $news: $(".news"),
      // $item: $(".menu__item"),
      // $wrapMenu: $(".wrap-menu"),
      $posts: null,
      menu: {
        modifs: {
          fixed: "tabs-container--fixed",
          itemActive: "tabs-link--active"
        },
        $elem: null,
        $items: null
      },
      positionPost: [],
      offsetHeight: 0, // верхнее смещение для скролла
      flagAnimation: true
    };
  },
  methods: {
    getTabLink(name) {
      return `#${name}`;
    },
    setPositionPost(elems) {
      elems.each(function(item) {
        // $(this) = статья
        this.positionPost[item] = {};
        this.positionPost[item].top = $(this).offset().top - this.offsetHeight;
        this.positionPost[item].bottom =
          this.positionPost[item].top + $(this).innerHeight();

        console.log(this.positionPost); // positionPost массив объектов с верхним и нижним отступом
      });
    },
    scrollPageFixMenu(e) {
      let scroll = window.pageYOffset;
      if (scroll < this.$posts.offset().top) {
        this.menu.$elem.removeClass(this.menu.modifs.fixed);
      } else {
        this.menu.$elem.addClass(this.menu.modifs.fixed);
      }

      // проверка на отступ сверху, если больше чем нужно ставим добавляем класс fixed
    },
    isFirstVision(elem, current) {
      let scroll = window.pageYOffset;
      return (
        scroll >= elem.top &&
        scroll < elem.bottom &&
        !current.hasClass(this.menu.modifs.itemActive)
      );
    },
    scrollPage(e) {
      this.positionPost.forEach((elem, index) => {
        let $currentelem = this.menu.$items.eq(index);
        if (isFirstVision(elem, $currentelem)) {
          $currentelem
            .addClass(this.menu.modifs.itemActive)
            .siblings()
            .removeClass(this.menu.modifs.itemActive);
        }
      });
    },
    clickMenu(e) {
      if (this.flagAnimation) {
        this.flagAnimation = false;

        let $elem = $(e.target);
        let index = $elem.index();
        let sectionOffset = Math.ceil(this.positionPost[index].top);

        $(document).off("scroll", scrollPage);
        $elem.siblings().removeClass(this.menu.modifs.itemActive);

        $("body, html").animate({ scrollTop: sectionOffset }, 1000, () => {
          $elem.addClass(this.menu.modifs.itemActive);
          $(document).on("scroll", scrollPage);
          this.flagAnimation = true;
        });
      }
    }
  },
  created() {
    const $vm = this;

    $vm.$posts = $(".blog-post");
    $vm.menu.$elem = $("#scroll_menu");
    $vm.menu.$items = $(".tabs-link");

    $(window).one("load", function(e) {
      $vm.setPositionPost($posts);
      $vm.menu.$elem.on("click", $vm.clickMenu);
      $(document).on("scroll", $vm.scrollPage);
      $(document).on("scroll", $vm.scrollPageFixMenu);
    });

    $(window).on("resize", function(e) {
      $vm.setPositionPost($posts);
    });
  }
};
</script>

<style lang="scss">
@import "@frontStylesPgs/Blog/import.scss";
</style>
