<template lang="pug">
  PageWrapper(title="Личные данные")
    //- form#upload.form(enctype="multipart/form-data" @submit.prevent="uploadImage")
    //-   PictureInput(
    //-     ref="pictureInput"
    //-     @change="changeImage"
    //-     @remove="removeImage"
    //-     :removable="true"
    //-     removeButtonClass="ui red button"
    //-     accept="image/jpeg, image/png, image/gif"
    //-     buttonClass="ui button primary"
    //-     :customStrings="{upload: '<h1>Bummer!</h1>', drag: 'Drag a 😺 GIF or GTFO'}")
    //-   .form__row.form__row-buttons
    //-     //- input.btn.form__btn(type="reset" value="Очистить")
    //-     ButtonElem Отправить
    //-   | {{fileMsg}}
    button
      clipper-upload(v-model="imgURL") upload image
    button(@click="getResult") clip image
    clipperBasic.my-clipper(ref="clipper" :src="imgURL" preview="my-preview")
        div.placeholder(slot="placeholder") No image
    div
        div preview:
        clipperPreview.my-clipper(name="my-preview")
            div.placeholder(slot="placeholder") preview area
    div
        div result:
        img.result(:src="resultURL" alt="")
</template>

<script>
import axios from "axios";
import { clipperBasic, clipperPreview } from "vuejs-clipper";
import upload from "@backend/mixins/upload";
import PictureInput from "vue-picture-input";
import PageWrapper from "@backCmp/PageWrapper";
import ButtonElem from "@components/FormElems/ButtonElem";

export default {
  name: "AdminUserView",
  components: {
    clipperBasic,
    clipperPreview,
    PageWrapper,
    PictureInput,
    ButtonElem
  },
  mixins: [upload],
  data() {
    return {
      imgURL: "",
      resultURL: ""
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
    },
    getResult: function() {
      const canvas = this.$refs.clipper.clip(); //call component's clip method
      this.resultURL = canvas.toDataURL("image/jpg", 1); //canvas->image
    }
  }
};
</script>

<style lang="scss">
.my-clipper {
  width: 100%;
  max-width: 700px;
}

.placeholder {
  text-align: center;
  padding: 20px;
  background-color: lightgray;
}
</style>
