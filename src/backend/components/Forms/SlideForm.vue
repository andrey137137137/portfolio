<template lang="pug">
  ItemForm(
    :handleSubmit="submit"
    :handleDelete="removeSlide"
    :id="getId()"
    :disabled="$v.$pending || $v.$invalid"
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
    //- div(v-for="(v, index) in $v.techs.$each.$iter")
    //-   InputEventElem(
    //-     v-model="v.name.$model"
    //-     :val="v.name"
    //-     :placeholder="`Технология ${getIndex(index)}`")
    //- .menu
    //-   button.btn(@click="techs.pop()") Remove
    //-   button.btn(@click="techs.push({name: ''})") Add
    MultipleElem(
      :vals="$v.techs.$each.$iter"
      :items="techs"
      :fields="fields"
      :propTemplate="propTemplate")
</template>

<script>
import {
  required
  // alphaNum,
  // minLength,
  // maxLength
} from "vuelidate/lib/validators";
import axios from "axios";
import upload from "@backend/mixins/upload";
import PictureInput from "vue-picture-input";
import ItemForm from "@backCmp/Forms/ItemForm";
import InputEventElem from "@components/FormElems/InputEventElem";
import MultipleElem from "@components/FormElems/MultipleElem";

import { mapActions } from "vuex";

export default {
  name: "SlideForm",
  components: {
    PictureInput,
    ItemForm,
    InputEventElem,
    MultipleElem
  },
  mixins: [upload],
  props: {
    slide: {
      type: Object,
      default: null
    }
  },
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

    if (!this.slide) {
      data.title = "";
      data.link = "";
      data.techs = [
        {
          name: "Html"
        },
        {
          name: "Css"
        },
        {
          name: "JavaScript"
        }
      ];
    } else {
      data.title = this.slide.title;
      data.link = this.slide.link;
      data.techs = this.slide.techs.map(item => {
        return { name: item };
      });
    }

    return data;
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
    ...mapActions(["deleteData", "updateData", "insertData"]),
    getId() {
      return this.slide ? this.slide._id : 0;
    },
    getIndex(index) {
      return parseInt(index) + 1;
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
    },
    removeSlide(id) {
      console.log(id);

      if (
        confirm(`Вы уверены, что хотите удалить пост: "${this.slide.title}"?`)
      ) {
        this.deleteData(id);
      }
    },
    submit() {
      if (this.$v.$invalid) {
        return false;
      }

      const image = this.image ? this.image.name : "";
      const data = {
        title: this.title,
        link: this.link,
        image,
        techs: this.techs.map(item => item.name)
      };

      if (!this.slide) {
        console.log(data);
        this.insertData(data);
      } else {
        data.date = this.date;
        this.updateData({ id: this.slide._id, data });
      }

      if (image) {
        this.uploadImage();
      }

      return true;
    }
  }
};
</script>
