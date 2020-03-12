<template lang="pug">
  PageWrapper(page="Личные данные")
    //- ProfileForm(
    //-   v-for="user in dbData"
    //-   :key="user.email"
    //-   :item="user")
    ProfileForm(
      :firstName="dbData.firstName"
      :lastName="dbData.lastName"
      :contacts="dbData.contacts"
      :email="dbData.email")
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
