<template lang="pug">
  PageWrapper(page="Личные данные")
    ProfileForm(
      :firstName="dbData.firstName"
      :lastName="dbData.lastName"
      :contacts="dbData.contacts"
      :email="dbData.email")
</template>

<script>
import pageDataMixin from "@backend/mixins/pageDataMixin";
import PageWrapper from "@backCmp/PageWrapper";
import ProfileForm from "@backCmp/Forms/ProfileForm";
export default {
  name: "AdminProfileView",
  components: {
    PageWrapper,
    ProfileForm
  },
  mixins: [pageDataMixin]
};
</script>
