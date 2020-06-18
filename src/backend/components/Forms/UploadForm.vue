<template lang="pug">
  AdminFormWrapper.upload_form(@submit.prevent.native="uploadImage")
    .upload_form-container
      clipper-basic.col.upload_form-col.my-clipper(
        ref="clipper"
        :src="imgURL"
        preview="my-preview"
      )
        .upload_form-placeholder(slot="placeholder") No image
      div.col.upload_form-col
        p preview:
        clipper-preview.my-clipper(name="my-preview")
          .upload_form-placeholder(slot="placeholder") preview area
    .form-row.form-row--buttons
      ButtonElem(
        :addClasses="buttonWrapperClass"
        type="button"
      )
        clipper-upload(v-model="imgURL" accept="image/jpeg") upload image
      ButtonElem(:addClasses="buttonWrapperClass") clip image
    //- div
    //-   div result:
    //-   img.result(:src="resultURL" alt="")
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
import uploadMixin from "@backend/mixins/uploadMixin";
import {
  clipperUpload,
  clipperRange,
  clipperBasic,
  clipperPreview
} from "vuejs-clipper";
// import PictureInput from "vue-picture-input";
import AdminFormWrapper from "@backCmp/AdminFormWrapper";
import ButtonElem from "@components/formElems/ButtonElem";

export default {
  name: "UploadForm",
  components: {
    AdminFormWrapper,
    ButtonElem,
    clipperUpload,
    clipperRange,
    clipperBasic,
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
  computed: {
    buttonWrapperClass() {
      return {
        "form-col": true,
        "form-btn--disabled": this.disabled
      };
    }
  },
  methods: {
    // changeImage() {
    //   this.image = this.$refs.pictureInput.file;
    //   console.log(this.image);
    // },
    // removeImage() {
    //   this.image = "";
    // },
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
.upload_form {
  &-container {
    display: flex;
    flex-wrap: wrap;
  }

  .container &-col {
    width: 50%;
  }

  &-placeholder {
    text-align: center;
    padding: 20px;
    background-color: lightgray;
  }
}
</style>
