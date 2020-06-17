<template lang="pug">
  Fragment
    button
      clipper-upload(v-model="imgURL" accept="image/jpeg") upload image
    button(@click="uploadImage") clip image
    clipper-fixed.my-clipper(
      ref="clipper"
      :src="imgURL"
      preview="my-preview"
    )
      .placeholder(slot="placeholder") No image
    div
      div preview:
      clipper-preview.my-clipper(name="my-preview")
        .placeholder(slot="placeholder") preview area
    div
      div result:
      img.result(:src="resultURL" alt="")
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
// import PictureInput from "vue-picture-input";

export default {
  name: "UploadForm",
  components: {
    Fragment,
    clipperUpload,
    clipperRange,
    clipperFixed,
    // clipperBasic,
    clipperPreview
    // PictureInput
  },
  mixins: [uploadMixin],
  props: {
    page: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: "mb"
    },
    ext: {
      type: String,
      default: "jpg"
    }
  },
  data() {
    return {
      imgURL: "",
      resultURL: ""
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
      // const data = {};

      this.resultURL = canvas.toDataURL(`image/${this.ext}`, 1); //canvas->image
      const data = new FormData();
      data.append(
        "image",
        this.dataURItoBlob(this.resultURL),
        `${this.name}.${this.ext}`
      );

      axios.post(this.getUploadPage(this.page), data).then(response => {
        this.fileMsg = response.data.msg;

        // if (response.data.status === "Ok") {
        //   this.resultURL = "";
        //   // this.$refs.upload.value = null;
        // }

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
