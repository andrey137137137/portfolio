<template lang="pug">
  PageWrapper(title="Личные данные")
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
      const data = new FormData();

      this.resultURL = canvas.toDataURL("image/jpg", 1); //canvas->image
      data.append("image", this.dataURItoBlob(this.resultURL), "avatar.jpg");

      axios.post(this.getUploadPage("avatar"), data).then(response => {
        this.fileMsg = response.data.msg;

        if (response.data.status === "Ok") {
          this.resultURL = "";
          // this.$refs.upload.value = null;
        }

        console.log("image upload response > ", response);
      });
    },
    dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(",")[1]);
      const mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const bb = new Blob([ab], { type: mimeString });
      return bb;
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
