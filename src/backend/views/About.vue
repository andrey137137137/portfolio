<template lang="pug">
  PageWrapper(page="Обо мне")
    form#upload.form(enctype="multipart/form-data" @submit.prevent="uploadImage")
      PictureInput(
        ref="pictureInput"
        @change="changeImage"
        @remove="removeImage"
        :removable="true"
        removeButtonClass="ui red button"
        accept="image/jpeg, image/png, image/gif"
        buttonClass="ui button primary"
        :customStrings="{upload: '<h1>Bummer!</h1>', drag: 'Обновить фотографию'}")
      .form-row.form-row--buttons
        //- input.btn.form-btn(type="reset" value="Очистить")
        ButtonElem Отправить
      | {{fileMsg}}
    SkillForm(
      v-for="skill in dbData"
      :key="skill._id"
      :item="skill")
    h3.form-legend Добавить навыки
    SkillForm
</template>

<script>
import axios from "axios";
import PictureInput from "vue-picture-input";
import pageData from "@backend/mixins/pageData";
import upload from "@backend/mixins/upload";
import PageWrapper from "@backCmp/PageWrapper";
import ButtonElem from "@components/FormElems/ButtonElem";
import SkillForm from "@backCmp/Forms/SkillForm";

export default {
  name: "AdminAboutView",
  components: {
    PageWrapper,
    PictureInput,
    ButtonElem,
    SkillForm
  },
  mixins: [pageData, upload],
  data() {
    return {
      image: null,
      fileMsg: ""
    };
  },
  methods: {
    changeImage() {
      this.image = this.$refs.pictureInput.file;
      console.log(this.image);
    },
    removeImage() {
      this.image = "";
    },
    uploadImage() {
      let data = new FormData();
      data.append("image", this.image, "about.jpg");

      axios.post(this.getUploadPage("slider"), data).then(response => {
        this.fileMsg = response.data.msg;

        if (response.data.status === "Ok") {
          this.image = null;
          this.$refs.upload.value = null;
        }

        console.log("image upload response > ", response);
      });
    }
  }
};
</script>
