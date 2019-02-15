<template lang="pug">
  PageWrapper(title="Личные данные")
    picture-input(
      ref="pictureInput"
      @change="onChanged"
      @remove="onRemoved"
      :removable="true"
      removeButtonClass="ui red button"
      accept="image/jpeg, image/png, image/gif"
      buttonClass="ui button primary"
      :customStrings="{upload: '<h1>Bummer!</h1>', drag: 'Drag a 😺 GIF or GTFO'}")
    button(@click="attemptUpload" v-bind:class="{ disabled: !image }") Upload
</template>

<script>
import axios from "axios";
import PictureInput from "vue-picture-input";
import PageWrapper from "@backCmp/PageWrapper";

export default {
  name: "AdminUserView",
  components: {
    PageWrapper,
    PictureInput
  },
  data() {
    return {
      image: ""
    };
  },
  methods: {
    upload(url, file, name = "avatar") {
      if (typeof url !== "string") {
        throw new TypeError(`Expected a string, got ${typeof url}`);
      }

      // You can add checks to ensure the url is valid, if you wish

      const formData = new FormData();
      formData.append(name, file);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      return axios.post(url, formData, config);
    },
    onChanged() {
      console.log("New picture loaded");
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file;
      } else {
        console.log("Old browser. No support for Filereader API");
      }
    },
    onRemoved() {
      this.image = "";
    },
    attemptUpload() {
      if (this.image) {
        this.upload(
          "http://localhost:8080/assets/userfiles/picture",
          this.image
        )
          .then(response => {
            if (response.data.success) {
              this.image = "";
              console.log("Image uploaded successfully ✨");
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }
};
</script>
