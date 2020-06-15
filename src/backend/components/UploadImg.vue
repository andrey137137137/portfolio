<template lang="pug">
  Fragment
    button
      clipper-upload(v-model="imgURL" accept="image/jpeg") upload image
    button(@click.prevent="uploadImage") clip image
    clipper-fixed.my-clipper(
      ref="clipper"
      :src="imgURL"
      preview="my-preview"
      round=true
    )
      .placeholder(slot="placeholder") No image
    div
      div preview:
      clipperPreview.my-clipper(name="my-preview")
        .placeholder(slot="placeholder") preview area
    div
      div result:
      img.result(:src="resultURL" alt="")
    //- a.btn(@click="toggleShow") set avatar
    //- my-upload(
    //-   field="image"
    //-   @crop-success="cropSuccess"
    //-   @crop-upload-success="cropUploadSuccess"
    //-   @crop-upload-fail="cropUploadFail"
    //-   v-model="show"
    //-   :width="141"
    //-   :height="141"
    //-   :url="getUploadPage('avatar')"
    //-   :params="params"
    //-   langType="ru"
    //-   img-format="jpg")
    //- img(:src="imgDataUrl")
    //-   //- :headers="headers"
    //- picture-input(
    //-   ref="pictureInput"
    //-   @change="changeImage"
    //-   @remove="removeImage"
    //-   :removable="true"
    //-   removeButtonClass="ui red button"
    //-   accept="image/jpeg, image/png, image/gif"
    //-   buttonClass="ui button primary"
    //-   :customStrings="{upload: '<h1>Bummer!</h1>', drag: 'Drag a 😺 GIF or GTFO'}")
</template>

<script>
import axios from "axios";
import { Fragment } from "vue-fragment";
import uploadMixin from "@backend/mixins/uploadMixin";
import {
  clipperUpload,
  clipperRange,
  clipperFixed,
  // clipperBasic,
  clipperPreview
} from "vuejs-clipper";
// import myUpload from "vue-image-crop-upload";
// import PictureInput from "vue-picture-input";

export default {
  name: "UploadImg",
  components: {
    Fragment,
    clipperUpload,
    clipperRange,
    clipperFixed,
    // clipperBasic,
    clipperPreview
    // myUpload,
    // PictureInput
  },
  mixins: [uploadMixin],
  props: {
    page: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imgURL: "",
      resultURL: ""
      // show: false,
      // params: {
      //   token: "123456798",
      //   name: "avatar"
      // },
      // headers: {
      //   smail: "*_~"
      // },
      // imgDataUrl: "", // the datebase64 url of created image
      // image: null,
      // fileMsg: ""
    };
  },
  methods: {
    // changeImage() {
    //   this.image = this.$refs.pictureInput.file;
    //   console.log(this.image);
    // },
    // removeImage() {
    //   this.image = "";
    // },
    uploadImage() {
      const canvas = this.$refs.clipper.clip(); //call component's clip method
      const data = new FormData();

      this.resultURL = canvas.toDataURL("image/jpg", 1); //canvas->image
      data.append("image", this.dataURItoBlob(this.resultURL), "avatar.jpg");

      axios.post(this.getUploadPage(this.page), data).then(response => {
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
    // toggleShow() {
    //   this.show = !this.show;
    // },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    // cropSuccess(imgDataUrl, field) {
    //   console.log("-------- crop success --------");
    //   this.imgDataUrl = imgDataUrl;
    //   console.log("field: " + field);
    // },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    // cropUploadSuccess(jsonData, field) {
    //   console.log("-------- upload success --------");
    //   console.log(jsonData);
    //   console.log("field: " + field);
    // },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    // cropUploadFail(status, field) {
    //   console.log("-------- upload fail --------");
    //   console.log(status);
    //   console.log("field: " + field);
    // }
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
