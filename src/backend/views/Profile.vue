<template lang="pug">
  PageWrapper(page="Личные данные")
    ProfileForm(:item="dbData")
</template>

<script>
import pageData from "@backend/mixins/pageData";
import PageWrapper from "@backCmp/PageWrapper";
import ProfileForm from "@backCmp/Forms/ProfileForm";
export default {
  name: "AdminProfileView",
  components: {
    PageWrapper,
    ProfileForm
  },
  mixins: [pageData]
};
</script>
