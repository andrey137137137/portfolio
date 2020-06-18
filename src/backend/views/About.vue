<template lang="pug">
  PageWrapper(page="Обо мне")
    UploadForm(page="about")
    SkillForm(
      v-for="skill in dbData"
      :key="skill._id"
      :item="skill")
    h3.form-legend Добавить навыки
    SkillForm
</template>

<script>
import PictureInput from "vue-picture-input";
import pageDataMixin from "@backend/mixins/pageDataMixin";
import PageWrapper from "@backCmp/PageWrapper";
import UploadForm from "@backCmp/forms/UploadForm";
import SkillForm from "@backCmp/forms/SkillForm";

export default {
  name: "AdminAboutView",
  components: {
    PageWrapper,
    PictureInput,
    UploadForm,
    SkillForm
  },
  mixins: [pageDataMixin]
};
</script>
