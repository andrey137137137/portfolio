<template lang="pug">
  div
    TopWrapper
      SectionWrapper(
        name="about"
        :isFullWidth="true"
        :isOwnContainerClass="true"
      )
        TitleWrapper(
          :title="config.name"
          containerAddClass="about-title_wrap"
          bgAddClass="title_wrap-bg--contrast"
        )
        .col.col--center.col--tb_8.about-col.img_wrap.about-img_wrap
          img.img_wrap-img(src="/upload/about.jpg" alt="")
        article.col.col--center.col--tb_8.about-col.about-text_wrap
          h2.section-title.section-title--uppercase.section-title--underlined.about-title Кто я
          p.section-desc.about-desc.about-desc--first Я веб разработчик из Одессы. Мне {{old}}. Я учусь разработке современных сайтов и приложений. Мне нравится решать сложные задачи.
          p.section-desc.about-desc {{profile.footerDesc}} Я периодически обновляю в нём свой контент.

      SectionWrapper(name="skills" :isOwnContainerClass="true")
        h2.section-title.section-title--uppercase.section-title--underlined.skills-title
          | Чем я могу быть
          br
          | Вам полезен
        p.col.col--center.col--tb_8.section-desc.skills-desc Больше всего меня привлекет Frontend разработка, но я также знаком и могу решать не сложные задачи на Backend. Но давайте по порядку.

        SkillList(:categories="dbData")

    BottomWrapper(:addClasses="bottomWrapClass")
      iframe.section.map(src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1373.5715527640798!2d30.7402854!3d46.4854787!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631985b45cb0b%3A0x6e315e968e5b2a42!2z0J7QtNC10YHRgdC60LjQuSDQs9C-0YHRg9C00LDRgNGB0YLQstC10L3QvdGL0Lkg0LDQutCw0LTQtdC80LjRh9C10YHQutC40Lkg0YLQtdCw0YLRgCDQvtC_0LXRgNGLINC4INCx0LDQu9C10YLQsA!5e0!3m2!1sru!2sua!4v1522350054754" frameborder="0" style="border:0" allowfullscreen)

      SectionWrapper(name="contacts" :isOwnContainerClass="true")
        //- ContactList(
          classBlock="contacts"
          :addClasses="clearfixClass"
          :addItemClasses="clearfixClass"
          :isIconed="true")
</template>

<script>
import pageConfig from "@frontend/mixins/pageConfig";
import TopWrapper from "@frontCmp/TopWrapper";
import SectionWrapper from "@frontCmp/SectionWrapper";
import TitleWrapper from "@frontCmp/TitleWrapper";
import SkillList from "@frontCmp/SkillList";
import BottomWrapper from "@frontCmp/BottomWrapper";
import ContactList from "@frontCmp/ContactList";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "AboutView",
  components: {
    TopWrapper,
    SectionWrapper,
    TitleWrapper,
    SkillList,
    BottomWrapper,
    ContactList
  },
  mixins: [pageConfig],
  data() {
    return {
      bottomWrapClass: {
        "bottom_wrap--map_wrap": true
      },
      clearfixClass: {
        clearfix: true
      }
    };
  },
  computed: {
    ...mapGetters(["profile"]),
    old() {
      return this.profile.old;
    }
  }
};
</script>

<style lang="scss">
@import "@frontStylesPgs/About/import";
</style>
