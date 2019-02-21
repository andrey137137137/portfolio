<template lang="pug">
  picture-input(
    ref="pictureInput"
    @change="changeImage"
    @remove="removeImage"
    :removable="true"
    removeButtonClass="ui red button"
    accept="image/jpeg, image/png, image/gif"
    buttonClass="ui button primary"
    :customStrings="{upload: '<h1>Bummer!</h1>', drag: 'Drag a 😺 GIF or GTFO'}")
</template>

<script>
import PictureInput from "vue-picture-input";

export default {
  name: "UploadImg",
  components: {
    PictureInput
  },
  data() {
    return {
      image: null,
      fileMsg: ""
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
