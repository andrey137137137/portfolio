<template lang="pug">
  AdminFormWrapper.upload_form(@submit.prevent.native="uploadImage")
    cropper(
      ref="cropper"
      :src="image"
      :stencil-component="$options.components.CircleStencil"
      :stencil-props="stencilProps")
    .form-row.form-row--buttons
      input(
        type="file"
        ref="file"
        @change="loadImage($event)" accept="image/*")
      ButtonElem(
        :addClasses="buttonWrapperClass"
        @click.prevent.native="uploadImage") clip image
</template>

<script>
import axios from "axios";
import uploadMixin from "@backend/mixins/uploadMixin";
import AdminFormWrapper from "@backCmp/AdminFormWrapper";
import { CircleStencil, Cropper } from "vue-advanced-cropper";
import ButtonElem from "@components/formElems/ButtonElem";
import PictureInput from "vue-picture-input";

export default {
  name: "UploadForm",
  components: {
    AdminFormWrapper,
    Cropper,
    CircleStencil,
    ButtonElem,
    PictureInput
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
    },
    stencilProps: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      img:
        "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80",
      resultCoordinates: { height: 141, width: 141, left: 0, top: 0 },
      stencilCoordinates: { height: 141, width: 141, left: 0, top: 0 },
      image: null,
      resultURL: ""
    };
  },
  computed: {
    style() {
      const { height, width, left, top } = this.stencilCoordinates;
      return {
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`
      };
    },
    buttonWrapperClass() {
      return {
        "form-col": true,
        "form-btn--disabled": this.disabled
      };
    }
  },
  methods: {
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
    },
    reset() {
      this.image = null;
    },
    loadImage(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.image = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    uploadImage() {
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
        this.resultURL = canvas.toDataURL(`image/${this.ext}`, 1);
        const form = new FormData();
        form.append(
          "image",
          this.dataURItoBlob(this.resultURL),
          `${this.name}.${this.ext}`
        );
        axios.post(this.getUploadPage(this.page), form).then(response => {
          this.fileMsg = response.data.message;

          // if (response.data.status === "Ok") {
          //   this.resultURL = "";
          //   // this.$refs.upload.value = null;
          // }

          console.log("image upload response > ", response);
        });
      }
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
