<template lang="pug">
Fragment
  TopWrapper.top_wrap-content
    SectionWrapper(
      name='about',
      :isFullWidth='true',
      :isOwnContainerClass='true'
    )
      TitleWrapper(
        :title='$route.meta.title',
        containerAddClass='about-title_wrap',
        bgAddClass='title_wrap-bg--contrast'
      )
      ImageWrapper.col.col--center.col--tb_8.about-col(
        :path='image.path',
        :breakpoints='breakpoints',
        title='Обо мне',
        :addClasses='image.classes'
      )
      article.col.col--center.col--tb_8.about-col.about-text_wrap
        h2.section-title.section-title--uppercase.section-title--underlined.about-title Кто я
        p.section-desc.about-desc.about-desc--first Я веб разработчик из Одессы. Мне {{ compOld }}. Я учусь разработке современных сайтов и приложений. Мне нравится решать сложные задачи.
        p.section-desc.about-desc {{ footerDesc }} Я периодически обновляю в нём свой контент.

    SectionWrapper(name='skills', :isOwnContainerClass='true')
      h2.section-title.section-title--uppercase.section-title--underlined.skills-title
        | Чем я могу быть
        br
        | Вам полезен
      p.col.col--center.col--tb_8.section-desc.skills-desc Больше всего меня привлекет Frontend разработка, но я также знаком и могу решать не сложные задачи на Backend. Но давайте по порядку.

      SkillList(:categories='dbData')

  BottomWrapper(:addClasses='bottomWrapClass')
    iframe.section.map(
      src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1373.5715527640798!2d30.7402854!3d46.4854787!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631985b45cb0b%3A0x6e315e968e5b2a42!2z0J7QtNC10YHRgdC60LjQuSDQs9C-0YHRg9C00LDRgNGB0YLQstC10L3QvdGL0Lkg0LDQutCw0LTQtdC80LjRh9C10YHQutC40Lkg0YLQtdCw0YLRgCDQvtC_0LXRgNGLINC4INCx0LDQu9C10YLQsA!5e0!3m2!1sru!2sua!4v1522350054754',
      frameborder='0',
      style='border: 0',
      allowfullscreen
    )

    SectionWrapper(name='contacts', :isOwnContainerClass='true')
      h2.section-title.section-title--uppercase.section-title--underlined.contacts-title Контакты
      ContactList(
        classBlock='contacts',
        :addClasses='clearfixClass',
        :addItemClasses='clearfixClass',
        :isIconed='true'
      )
    ScrollButton.scroll_btn--on_map(:inHeader='false')
  FooterWrapper
</template>

<script>
import { Fragment } from 'vue-fragment';
import { getBreakpointsWithExt } from '@apiHelpers';
import TopWrapper from '@frontCmp/TopWrapper';
import SectionWrapper from '@frontCmp/SectionWrapper';
import TitleWrapper from '@frontCmp/TitleWrapper';
import ImageWrapper from '@frontCmp/ImageWrapper';
import SkillList from '@frontCmp/SkillList';
import BottomWrapper from '@frontCmp/BottomWrapper';
import ContactList from '@frontCmp/ContactList';
import ScrollButton from '@frontCmp/ScrollButton';
import FooterWrapper from '@frontCmp/FooterWrapper';

import { mapGetters, createNamespacedHelpers } from 'vuex';
const profileMapGetters = createNamespacedHelpers('profile').mapGetters;

export default {
  name: 'AboutView',
  components: {
    Fragment,
    TopWrapper,
    SectionWrapper,
    TitleWrapper,
    ImageWrapper,
    SkillList,
    BottomWrapper,
    ContactList,
    ScrollButton,
    FooterWrapper,
  },
  data() {
    return {
      image: {
        classes: {
          'about-img_wrap': true,
        },
        path: '/upload/about',
      },
      bottomWrapClass: {
        'bottom_wrap--map_wrap': true,
      },
      clearfixClass: {
        clearfix: true,
      },
    };
  },
  computed: {
    ...mapGetters(['dbData']),
    ...profileMapGetters(['old', 'footerDesc']),
    breakpoints() {
      return getBreakpointsWithExt('jpg', ['xl']);
    },
    compOld() {
      let yearStr = '';

      if (this.old > 10 && this.old < 20) {
        yearStr = 'лет';
      } else {
        switch (this.old % 10) {
          case 1:
            yearStr = 'год';
            break;
          case 2:
          case 3:
          case 4:
            yearStr = 'года';
            break;
          default:
            yearStr = 'лет';
        }
      }

      return `${this.old} ${yearStr}`;
    },
  },
};
</script>

<style lang="scss">
@import '@frontStylesPgs/About/import';
</style>
