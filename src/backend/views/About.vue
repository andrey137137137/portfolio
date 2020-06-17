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
import UploadForm from "@backCmp/Forms/UploadForm";
import SkillForm from "@backCmp/Forms/SkillForm";

export default {
  name: "AdminAboutView",
  components: {
    PageWrapper,
    PictureInput,
    UploadForm,
    SkillForm
  },
  mixins: [pageDataMixin]
  // data() {
  //   return {
  //     image: null,
  //     fileMsg: ""
  //   };
  // },
  // methods: {
  //   changeImage() {
  //     this.image = this.$refs.pictureInput.file;
  //     console.log(this.image);
  //   },
  //   removeImage() {
  //     this.image = "";
  //   },
  //   uploadImage() {
  //     let data = new FormData();
  //     data.append("image", this.image, "about.jpg");

  //     axios.post(this.getUploadPage("avatar"), data).then(response => {
  //       this.fileMsg = response.data.msg;

  //       if (response.data.status === "Ok") {
  //         this.image = null;
  //         this.$refs.upload.value = null;
  //       }

  //       console.log("image upload response > ", response);
  //     });
  //   }
  // }
};
</script>
