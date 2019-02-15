<template lang="pug">
  PageWrapper(title="Обо мне")
    skill-cat(
      v-for="skillCat in dbData"
      :key="skillCat._id"
      :skillCat="skillCat"
    )
</template>

<script>
import pageData from "@backend/mixins/pageData";
import PageWrapper from "@backCmp/PageWrapper";
import skillCat from "@backCmp/Forms/skillCat";

export default {
  name: "AdminAboutView",
  components: {
    PageWrapper,
    skillCat
  },
  mixins: [pageData],
  data() {
    return {
      dbPage: "skill"
    };
  }
};
</script>
