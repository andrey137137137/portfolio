<template lang="pug">
  .container
    h1.section__title.section__main_title.main__big_title Страница "Обо мне"
    skill-cat(
      v-for="skillCat in dbData"
      :key="skillCat._id"
      :skillCat="skillCat"
    )
</template>

<script>
import pageConfig from "@backend/mixins/pageConfig";
import skillCat from "@backCmp/Forms/skillCat";

export default {
  name: "AdminAboutView",
  components: {
    skillCat
  },
  mixins: [pageConfig],
  data() {
    return {
      dbPage: "skill"
    };
  }
};
</script>
