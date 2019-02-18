<template lang="pug">
  PageWrapper(title="Личные данные")
    //- picture-input(
    //-   ref="pictureInput"
    //-   @change="onChanged"
    //-   @remove="onRemoved"
    //-   :removable="true"
    //-   removeButtonClass="ui red button"
    //-   accept="image/jpeg, image/png, image/gif"
    //-   buttonClass="ui button primary"
    //-   :customStrings="{upload: '<h1>Bummer!</h1>', drag: 'Drag a 😺 GIF or GTFO'}")
    //- button(@click="attemptUpload" v-bind:class="{ disabled: !image }") Upload

    form#upload.form(enctype="multipart/form-data" @submit.prevent="uploadImage")
      //- .form__wrap.form__wrap-text
      //-   input.form__input(
      //-     :image="image"
      //-     type="file"
      //-     accept="image/*"
      //-     required
      //-     @change="changeImage($event)"
      //-     ref="upload")
      picture-input(
        ref="pictureInput"
        @change="changeImage"
        @remove="removeImage"
        :removable="true"
        removeButtonClass="ui red button"
        accept="image/jpeg, image/png, image/gif"
        buttonClass="ui button primary"
        :customStrings="{upload: '<h1>Bummer!</h1>', drag: 'Drag a 😺 GIF or GTFO'}")
      .form__row.form__row-buttons
        //- input.btn.form__btn(type="reset" value="Очистить")
        ButtonElem Отправить
      | {{fileMsg}}
</template>

<script>
import axios from "axios";
import PictureInput from "vue-picture-input";
import PageWrapper from "@backCmp/PageWrapper";
import ButtonElem from "@components/FormElems/ButtonElem";

export default {
  name: "AdminUserView",
  components: {
    PageWrapper,
    PictureInput,
    ButtonElem
  },
  data() {
    return {
      image: null,
      fileMsg: ""
    };
  },
  methods: {
    // upload(url, file, name = "avatar") {
    //   if (typeof url !== "string") {
    //     throw new TypeError(`Expected a string, got ${typeof url}`);
    //   }

    //   // You can add checks to ensure the url is valid, if you wish

    //   const formData = new FormData();
    //   formData.append(name, file);
    //   const config = {
    //     headers: {
    //       "content-type": "multipart/form-data"
    //     }
    //   };

    //   return axios.post(url, formData, config);
    // },
    // onChanged(image) {
    //   console.log("New picture loaded");
    //   if (this.$refs.pictureInput.file) {
    //     this.image = this.$refs.pictureInput.file;
    //     console.log(this.image);
    //   } else {
    //     console.log("Old browser. No support for Filereader API");
    //   }
    // },
    // attemptUpload() {
    //   if (this.image) {
    //     this.upload("http://localhost:8080/", this.image)
    //       .then(response => {
    //         if (response.data.success) {
    //           this.image = "";
    //           console.log("Image uploaded successfully ✨");
    //         }
    //       })
    //       .catch(err => {
    //         console.error(err);
    //       });
    //   }
    // },
    changeImage() {
      this.image = this.$refs.pictureInput.file;
      console.log(this.image);
    },
    removeImage() {
      this.image = "";
    },
    uploadImage() {
      const URL = "http://localhost:3000/avatar";

      let data = new FormData();
      data.append("image", this.image, this.image.name);

      axios.post(URL, data).then(response => {
        this.fileMsg = response.data.msg;

        if (response.data.status === "Ok") {
          this.image = null;
          this.$refs.upload.value = null;
        }

        console.log("image upload response > ", response);
      });
    }
  }
};
</script>
