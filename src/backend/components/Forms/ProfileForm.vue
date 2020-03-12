<template lang="pug">
  UserForm(
    :handleSubmit="submit"
    :disabled="disabled"
  )
    //- button
    //-   clipper-upload(v-model="imgURL" accept="image/jpeg") upload image
    //- button(@click="uploadImage") clip image
    //- clipper-fixed.my-clipper(
    //-   ref="clipper"
    //-   :src="imgURL"
    //-   preview="my-preview"
    //-   :ratio="1"
    //-   :round="true"
    //- )
    //-   div.placeholder(slot="placeholder") No image
    //- div
    //-   clipper-range
    //- div
    //-   div preview:
    //-   clipperPreview.my-clipper(name="my-preview")
    //-     div.placeholder(slot="placeholder") preview area
    //- div
    //-   div result:
    //-   img.result(:src="resultURL" alt="")
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
    InputEventElem(
      v-model="firstName"
      :val="$v.firstName"
      placeholder="Имя")
    InputEventElem(
      v-model="lastName"
      :val="$v.lastName"
      placeholder="Фамилия")
    InputEventElem(
      v-model="email"
      :val="$v.email"
      placeholder="Email")
    MultipleElem(
      :vals="$v.contacts.$each.$iter"
      :items="contacts"
      :fields="contactFields"
      :propTemplate="contactTemplate")
</template>

<script>
// import axios from "axios";
import {
  required,
  alphaNum,
  email
  // minValue,
  // maxValue
} from "vuelidate/lib/validators";
import upload from "@backend/mixins/upload";
// import { clipperBasic, clipperPreview } from "vuejs-clipper";
// import myUpload from "vue-image-crop-upload";
// import PictureInput from "vue-picture-input";
import formMxn from "@backend/mixins/form";
import userFormMxn from "@backend/mixins/userForm";
import UserForm from "@backCmp/Forms/UserForm";
import InputEventElem from "@components/FormElems/InputEventElem";
import MultipleElem from "@components/FormElems/MultipleElem";

export default {
  name: "ProfileForm",
  components: {
    // clipperBasic,
    // clipperPreview,
    // "my-upload": myUpload,
    UserForm,
    InputEventElem,
    // PictureInput,
    MultipleElem
  },
  mixins: [upload, formMxn, userFormMxn],
  data() {
    const contactTemplate = { name: "", value: "", icon: "" };

    return {
      // imgURL: "",
      // resultURL: "",
      show: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "", // the datebase64 url of created image
      contactFields: [
        {
          name: "name",
          type: "text",
          placeholder: "Контакт"
        },
        {
          name: "value",
          type: "text",
          placeholder: "Значение"
        },
        {
          name: "icon",
          type: "text",
          placeholder: "Иконка"
        }
      ],
      contactTemplate
    };
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    contacts: {
      $each: {
        name: {
          required,
          alphaNum
        },
        value: {
          required,
          alphaNum
        },
        icon: {
          required,
          alphaNum
        }
      }
    }
  },
  methods: {
    prepareData() {
      this.submitData = {
        firstName: this.firstName,
        lastName: this.lastName,
        contacts: this.cloneMultipleArray(this.contacts, this.contactTemplate),
        email: this.email
      };
    },
    // changeImage() {
    //   this.image = this.$refs.pictureInput.file;
    //   console.log(this.image);
    // },
    // removeImage() {
    //   this.image = "";
    // },
    // uploadImage() {
    //   const canvas = this.$refs.clipper.clip(); //call component's clip method
    //   const data = new FormData();

    //   this.resultURL = canvas.toDataURL("image/jpg", 1); //canvas->image
    //   data.append("image", this.dataURItoBlob(this.resultURL), "avatar.jpg");

    //   axios.post(this.getUploadPage("avatar"), data).then(response => {
    //     this.fileMsg = response.data.msg;

    //     if (response.data.status === "Ok") {
    //       this.resultURL = "";
    //       // this.$refs.upload.value = null;
    //     }

    //     console.log("image upload response > ", response);
    //   });
    // },
    // dataURItoBlob(dataURI) {
    //   const byteString = atob(dataURI.split(",")[1]);
    //   const mimeString = dataURI
    //     .split(",")[0]
    //     .split(":")[1]
    //     .split(";")[0];
    //   const ab = new ArrayBuffer(byteString.length);
    //   const ia = new Uint8Array(ab);
    //   for (var i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i);
    //   }
    //   const bb = new Blob([ab], { type: mimeString });
    //   return bb;
    // },
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    // cropSuccess(imgDataUrl, field) {
    //   console.log("-------- crop success --------");
    //   this.imgDataUrl = imgDataUrl;
    // },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
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
