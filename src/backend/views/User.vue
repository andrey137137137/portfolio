<template lang="pug">
  PageWrapper(title="Личные данные")
    form#upload.form(enctype="multipart/form-data" @submit.prevent="uploadImage")
      PictureInput(
        ref="pictureInput"
        @change="changeImage"
        @remove="removeImage"
        :removable="true"
        removeButtonClass="ui red button"
        accept="image/jpeg, image/png, image/gif"
        buttonClass="ui button primary"
        :customStrings="{upload: '<h1>Bummer!</h1>', drag: 'Drag a 😺 GIF or GTFO'}")
      .form__row.form__row-buttons
        //- input.btn.form__btn(type="reset" value="Очистить")
        ButtonElem Отправить
      | {{fileMsg}}
</template>

<script>
import axios from "axios";
import upload from "@backend/mixins/upload";
import PictureInput from "vue-picture-input";
import PageWrapper from "@backCmp/PageWrapper";
import ButtonElem from "@components/FormElems/ButtonElem";

export default {
  name: "AdminUserView",
  components: {
    PageWrapper,
    PictureInput,
    ButtonElem
  },
  mixins: [upload],
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
      data.append("image", this.image, this.image.name);

      axios.post(this.getUploadPage("avatar"), data).then(response => {
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
