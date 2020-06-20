<template lang="pug">
  PageWrapper(page="Личные данные")
    UploadForm(
      page="avatar"
      :isRound="true"
      :stencilProps="stencilProps"
      :cropSize="cropSize")
    ProfileForm(
      :firstName="dbData.firstName"
      :lastName="dbData.lastName"
      :contacts="dbData.contacts"
      :email="dbData.email")
</template>

<script>
import uploadMixin from "@backend/mixins/uploadMixin";
import pageDataMixin from "@backend/mixins/pageDataMixin";
import PageWrapper from "@backCmp/PageWrapper";
import UploadForm from "@backCmp/forms/UploadForm";
import ProfileForm from "@backCmp/forms/ProfileForm";

export default {
  name: "AdminProfileView",
  components: {
    PageWrapper,
    UploadForm,
    ProfileForm
  },
  mixins: [uploadMixin, pageDataMixin],
  data() {
    return {
      stencilProps: {
        aspectRatio: 1
      },
      cropSize: {
        width: 141,
        height: 141
      }
    };
  }
};
</script>
