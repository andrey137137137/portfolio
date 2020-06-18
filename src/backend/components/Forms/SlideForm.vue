<template lang="pug">
  ItemForm(
    :handleSubmit="submit"
    :handleDelete="removeItem"
    :id="id"
    :disabled="disabled"
  )
    InputEventElem(
      v-model="title"
      :val="$v.title"
      placeholder="Название")
    InputEventElem(
      v-model="link"
      :val="$v.link"
      placeholder="Ссылка")
    PictureInput(
      ref="pictureInput"
      @change="changeImage"
      @remove="removeImage"
      :removable="true"
      removeButtonClass="ui red button"
      accept="image/jpeg, image/png, image/gif"
      buttonClass="ui button primary"
      :customStrings="{upload: '<h1>Bummer!</h1>', drag: 'Drag a 😺 GIF or GTFO'}")
    MultipleElem(
      :vals="$v.techs.$each.$iter"
      :items="techs"
      :fields="fields"
      :propTemplate="propTemplate")
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required
  // alphaNum,
  // minLength,
  // maxLength
} from "vuelidate/lib/validators";
import axios from "axios";
import exist from "@common/helpers/exist";
import uploadMixin from "@backend/mixins/uploadMixin";
import backFormMixin from "@backend/mixins/backFormMixin";
import itemFormMixin from "@backend/mixins/itemFormMixin";
import PictureInput from "vue-picture-input";
import ItemForm from "@backCmp/forms/ItemForm";
import InputEventElem from "@components/formElems/InputEventElem";
import MultipleElem from "@components/formElems/MultipleElem";

export default {
  name: "SlideForm",
  components: {
    PictureInput,
    ItemForm,
    InputEventElem,
    MultipleElem
  },
  mixins: [uploadMixin, validationMixin, backFormMixin, itemFormMixin],
  data() {
    const data = {
      image: null,
      fields: [
        {
          name: "name",
          type: "text",
          placeholder: "Технология"
        }
      ],
      propTemplate: { name: "" }
    };

    // if (!this.slide) {
    //   data.title = "";
    //   data.link = "";
    //   data.techs = [
    //     {
    //       name: "Html"
    //     },
    //     {
    //       name: "Css"
    //     },
    //     {
    //       name: "JavaScript"
    //     }
    //   ];
    // } else {
    //   data.title = this.slide.title;
    //   data.link = this.slide.link;
    //   data.techs = this.slide.techs.map(item => {
    //     return { name: item };
    //   });
    // }

    if (!this.item) {
      return { ...data, ...this.defaultFields() };
    }

    return {
      ...data,
      title: this.item.title,
      link: this.item.link,
      techs: exist("techs", this.item)
        ? this.item.techs.map(item => {
            return { name: item };
          })
        : []
    };
  },
  validations: {
    title: {
      required
    },
    link: {
      required
    },
    techs: {
      required,
      $each: {
        name: {
          required
        }
      }
    }
  },
  methods: {
    // getIndex(index) {
    //   return parseInt(index) + 1;
    // },
    defaultFields() {
      return {
        title: "",
        link: "",
        techs: [
          {
            name: "HTML"
          },
          {
            name: "CSS"
          },
          {
            name: "JavaScript"
          }
        ]
      };
    },
    prepareData() {
      this.submitData = {
        title: this.title,
        link: this.link,
        image: this.image ? this.image.name : "",
        techs: this.techs.map(item => item.name)
      };
    },
    changeImage() {
      this.image = this.$refs.pictureInput.file;
      console.log(this.image);
    },
    removeImage() {
      this.image = "";
    },
    uploadImage() {
      let data = new FormData();
      data.append("image", this.image, this.image.name);

      axios.post(this.getUploadPage("slider"), data).then(response => {
        this.fileMsg = response.data.msg;

        if (response.data.status === "Ok") {
          this.image = null;
          this.$refs.upload.value = null;
        }

        console.log("image upload response > ", response);
      });
    }
    // submit() {
    //   if (this.$v.$invalid) {
    //     return false;
    //   }

    //   const image = this.image ? this.image.name : "";
    //   const data = {
    //     title: this.title,
    //     link: this.link,
    //     image,
    //     techs: this.techs.map(item => item.name)
    //   };

    //   if (!this.slide) {
    //     console.log(data);
    //     this.insertData(data);
    //   } else {
    //     data.date = this.date;
    //     this.updateData({ id: this.slide._id, data });
    //   }

    //   if (image) {
    //     this.uploadImage();
    //   }

    //   return true;
    // }
  }
};
</script>
