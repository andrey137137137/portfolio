<template lang="pug">
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
          span.blog-date {{getDate(post.date)}}
          p {{post.body}}

          .blog-separator(v-show="index < dbData.length - 1")
</template>

<script>
import $ from 'jquery';
import pageConfigMixin from '@frontend/mixins/pageConfigMixin';
import TopWrapper from '@frontCmp/TopWrapper';

export default {
  name: 'BlogView',
  components: {
    TopWrapper,
  },
  mixins: [pageConfigMixin],
  data() {
    return {
      // $news: $(".news"),
      // $item: $(".menu__item"),
      // $wrapMenu: $(".wrap-menu"),
      $posts: null,
      menu: {
        modifs: {
          fixed: 'tabs-container--fixed',
          itemActive: 'tabs-link--active',
        },
        $elem: null,
        $items: null,
      },
      postPositions: [],
      offsetHeight: 0, // верхнее смещение для скролла
      flagAnimation: true,
    };
  },
  methods: {
    getTabLink(name) {
      return `#${name}`;
    },
    getDate(value) {
      const time = new Date(value);
      const options = {
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
      };

      return `${time.toLocaleString('ru', options)} ${time.getFullYear()}`;
    },
    setPostPositions() {
      const $vm = this;
      $vm.$posts.each(function(item) {
        $vm.postPositions[item] = {};
        $vm.postPositions[item].top = $(this).offset().top - this.offsetHeight;
        $vm.postPositions[item].bottom =
          $vm.postPositions[item].top + $(this).innerHeight();
      });
    },
    scrollPageFixMenu() {
      if (window.pageYOffset < this.$posts.offset().top) {
        this.menu.$elem.removeClass(this.menu.modifs.fixed);
      } else {
        this.menu.$elem.addClass(this.menu.modifs.fixed);
      }
    },
    isFirstVision(elem, current) {
      return (
        window.pageYOffset >= elem.top &&
        window.pageYOffset < elem.bottom &&
        !current.hasClass(this.menu.modifs.itemActive)
      );
    },
    scrollPage() {
      const $vm = this;

      $vm.postPositions.forEach((elem, index) => {
        const $currentelem = $vm.menu.$items.eq(index);

        if ($vm.isFirstVision(elem, $currentelem)) {
          $currentelem
            .addClass($vm.menu.modifs.itemActive)
            .siblings()
            .removeClass($vm.menu.modifs.itemActive);
        }
      });
    },
    clickMenu(e) {
      if (!this.flagAnimation) {
        return false;
      }

      const $vm = this;
      const $elem = $(e.target);
      const index = $elem.index();
      const sectionOffset = Math.ceil($vm.postPositions[index].top);

      $vm.flagAnimation = false;

      $(document).off('scroll', $vm.scrollPage);
      $elem.siblings().removeClass($vm.menu.modifs.itemActive);

      $('body, html').animate({ scrollTop: sectionOffset }, 1000, () => {
        $elem.addClass($vm.menu.modifs.itemActive);
        $(document).on('scroll', $vm.scrollPage);
        $vm.flagAnimation = true;
      });
    },
  },
  updated() {
    const $vm = this;

    $vm.$posts = $('.blog-post');
    $vm.menu.$elem = $('#scroll_menu');
    $vm.menu.$items = $('.tabs-link');

    $vm.setPostPositions();
    $vm.menu.$elem.on('click', $vm.clickMenu);
    $(document).on('scroll', $vm.scrollPage);
    $(document).on('scroll', $vm.scrollPageFixMenu);

    $(window).on('resize', () => {
      $vm.setPostPositions();
    });
  },
};
</script>

<style lang="scss">
@import '@frontStylesPgs/Blog/import.scss';
</style>
