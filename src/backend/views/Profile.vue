<template lang="pug">
  PageWrapper(page="Личные данные")
    UploadForm(page="avatar" name="avatar")
    a.btn(@click="toggleShow") set avatar
    my-upload(
      field="image"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="141"
      :height="141"
      :url="getUploadPage('avatar')"
      :params="params"
      :headers="headers"
      langType="ru"
      img-format="jpg")
    img(:src="imgDataUrl")
    ProfileForm(
      :firstName="dbData.firstName"
      :lastName="dbData.lastName"
      :contacts="dbData.contacts"
      :email="dbData.email")
</template>

<script>
import myUpload from "vue-image-crop-upload";
import uploadMixin from "@backend/mixins/uploadMixin";
import pageDataMixin from "@backend/mixins/pageDataMixin";
import PageWrapper from "@backCmp/PageWrapper";
import UploadForm from "@backCmp/forms/UploadForm";
import ProfileForm from "@backCmp/forms/ProfileForm";

export default {
  name: "AdminProfileView",
  components: {
    myUpload,
    PageWrapper,
    UploadForm,
    ProfileForm
  },
  mixins: [uploadMixin, pageDataMixin],
  data() {
    return {
      show: false,
      params: {
        // token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
      console.log("field: " + field);
    },
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
