<template lang="pug">
  PageWrapper(title="Мои работы")
    //- SlideForm(
    //-   v-for="slide in dbData"
    //-   :key="slide._id"
    //-   :slide="slide")
    h3.form__legend Добавить запись
    SlideForm(:isNew="true")
</template>

<script>
import PageWrapper from "@backCmp/PageWrapper";
import pageData from "@backend/mixins/pageData";
import SlideForm from "@backCmp/Forms/SlideForm";

export default {
  name: "AdminWorksView",
  components: {
    PageWrapper,
    SlideForm
  },
  mixins: [pageData],
  data() {
    return {
      dbPage: "slide"
    };
  }
};
</script>

<style lang="scss" src="../styles/pages/Page.scss" scoped></style>
