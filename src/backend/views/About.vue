<template lang="pug">
  PageWrapper(title="Обо мне")
    SkillForm(
      v-for="skill in dbData"
      :key="skill._id"
      :item="skill")
    h3.form__legend Добавить навыки
    SkillForm
</template>

<script>
import pageData from "@backend/mixins/pageData";
import PageWrapper from "@backCmp/PageWrapper";
import SkillForm from "@backCmp/Forms/SkillForm";

export default {
  name: "AdminAboutView",
  components: {
    PageWrapper,
    SkillForm
  },
  mixins: [pageData]
};
</script>
