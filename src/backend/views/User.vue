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
    button(@click="uploadImage") clip image
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
      const canvas = this.$refs.clipper.clip(); //call component's clip method
      let data = new FormData();
      let blob;

      this.resultURL = canvas.toDataURL("image/jpg", 1); //canvas->image
      blob = this.dataURItoBlob(this.resultURL);
      data.append("image", blob, "avatar.png");

      console.log(blob);

      axios.post(this.getUploadPage("avatar"), data).then(response => {
        this.fileMsg = response.data.msg;

        // if (response.data.status === "Ok") {
        //   this.resultURL = null;
        //   this.$refs.upload.value = null;
        // }

        console.log("image upload response > ", response);
      });
    },
    dataURItoBlob: function(dataURI) {
      var byteString = atob(dataURI.split(",")[1]);

      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      var bb = new Blob([ab], { type: mimeString });
      return bb;
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
