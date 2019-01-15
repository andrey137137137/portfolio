<template lang="pug">
  PageWrapper
    TopWrapper
      SectionWrapper(name="about" :isFullWidth="true" :isOwnContainerClass="true")
        TitleWrapper(
          :title="config.name"
          :addClasses="{about__title_wrap: true}"
          :bgAddClasses="{'title_wrap__bg-contrast': true}"
        )
        .col.col-center.col-tb_8.about__col.img_wrap.about__img_wrap
          img.img_wrap__img(src="../../assets/userfiles/about.jpg" alt="")
        article.col.col-center.col-tb_8.about__col.about__text_wrap
          h2.section__title.section__title-uppercase.section__title-underlined.about__title Кто я
          p.section__desc.about__desc.about__desc-first Я веб разработчик из Одессы. Мне 31 год. Я учусь разработке современных сайтов и приложений. Мне нравится решать сложные задачи.
          p.section__desc.about__desc Этот сайт я делаю в рамках обучения в Школе онлайн образования LoftSchool. Чуть позже я освежу в нём свой контент. А пока посмотрите, как тут всё становится красиво!
</template>

<script>
import PageWrapper from "@frontCmp/PageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";
import SectionWrapper from "@frontCmp/SectionWrapper";
import TitleWrapper from "@frontCmp/TitleWrapper";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "AboutView",
  components: {
    PageWrapper,
    TopWrapper,
    SectionWrapper,
    TitleWrapper
  },
  computed: {
    ...mapGetters(["config"])
  },
  methods: {
    ...mapActions(["setConfig"])
  },
  created() {
    this.setConfig({
      name: "Обо мне",
      isContent: true,
      sections: 4
    });
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/About.scss">
</style>
