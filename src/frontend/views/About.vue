<template lang="pug">
  FullPageWrapper
    TopWrapper
      SectionWrapper(
        name="about"
        :isFullWidth="true"
        :isOwnContainerClass="true"
      )
        TitleWrapper(
          :title="config.name"
          containerAddClass="about__title_wrap"
          bgAddClass="title_wrap__bg-contrast"
        )
        .col.col-center.col-tb_8.about__col.img_wrap.about__img_wrap
          img.img_wrap__img(src="@/assets/userfiles/about.jpg" alt="")
        article.col.col-center.col-tb_8.about__col.about__text_wrap
          h2.section__title.section__title-uppercase.section__title-underlined.about__title Кто я
          p.section__desc.about__desc.about__desc-first Я веб разработчик из Одессы. Мне 31 год. Я учусь разработке современных сайтов и приложений. Мне нравится решать сложные задачи.
          p.section__desc.about__desc Этот сайт я делаю в рамках обучения в Школе онлайн образования LoftSchool. Чуть позже я освежу в нём свой контент. А пока посмотрите, как тут всё становится красиво!

      SectionWrapper(name="skills" :isOwnContainerClass="true")
        h2.section__title.section__title-uppercase.section__title-underlined.skills__title
          | Чем я могу быть
          br
          | Вам полезен
        p.col.col-center.col-tb_8.section__desc.skills__desc Больше всего меня привлекет Frontend разработка, но я также знаком и могу решать не сложные задачи на Backend. Но давайте по порядку.

        SkillList(:categories="dbData")

    BottomWrapper(:addClasses="bottomWrapClass")
      iframe.section.map(src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1373.5715527640798!2d30.7402854!3d46.4854787!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631985b45cb0b%3A0x6e315e968e5b2a42!2z0J7QtNC10YHRgdC60LjQuSDQs9C-0YHRg9C00LDRgNGB0YLQstC10L3QvdGL0Lkg0LDQutCw0LTQtdC80LjRh9C10YHQutC40Lkg0YLQtdCw0YLRgCDQvtC_0LXRgNGLINC4INCx0LDQu9C10YLQsA!5e0!3m2!1sru!2sua!4v1522350054754" frameborder="0" style="border:0" allowfullscreen)

      SectionWrapper(name="contacts" :isOwnContainerClass="true")
        ContactList(
          classBlock="contacts"
          :addClasses="clearfixClass"
          :addItemClasses="clearfixClass"
          :isIconed="true")
</template>

<script>
import pageConfig from "@frontend/mixins/pageConfig";
import FullPageWrapper from "@frontCmp/FullPageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";
import SectionWrapper from "@frontCmp/SectionWrapper";
import TitleWrapper from "@frontCmp/TitleWrapper";
import SkillList from "@frontCmp/SkillList";
import BottomWrapper from "@frontCmp/BottomWrapper";
import ContactList from "@frontCmp/ContactList";

export default {
  name: "AboutView",
  components: {
    FullPageWrapper,
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
      dbPage: "skill",
      configParams: {
        name: "Обо мне",
        isContent: true,
        sections: 4
      },
      bottomWrapClass: {
        "bottom_wrap-map_wrap": true
      },
      clearfixClass: {
        clearfix: true
      }
    };
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/About.scss">
</style>
