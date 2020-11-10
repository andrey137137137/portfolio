<template lang="pug">
ItemForm(
  :handleSubmit='submit',
  :handleDelete='removeItem',
  :id='id',
  :disabled='disabled'
)
  InputEventElem(v-model='title', :val='$v.title', placeholder='Название')
  InputEventElem(v-model='link', :val='$v.link', placeholder='Ссылка')
  .img_wrap
    img.img_wrap-img(:src='imagePreview', :alt='imageName')
  PictureInput(
    ref='pictureInput',
    @change='changeImage',
    @remove='removeImage',
    :removable='true',
    removeButtonClass='ui red button',
    accept='image/jpeg, image/png, image/gif',
    buttonClass='ui button primary',
    :customStrings='{ upload: "<h1>Bummer!</h1>", drag: "Drag a 😺 GIF or GTFO" }'
  )
  MultipleElem(
    :vals='$v.techs.$each.$iter',
    :items='techs',
    :fields='fields',
    :propTemplate='propTemplate'
  )
</template>

<script>
import {
  required,
  // alphaNum,
  // minLength,
  // maxLength
} from 'vuelidate/lib/validators';
import axios from 'axios';
import { SUCCESS } from '@httpSt';
import exist from '@common/helpers/exist';
import uploadMixin from '@backend/mixins/uploadMixin';
import itemFormMixin from '@backend/mixins/itemFormMixin';
import PictureInput from 'vue-picture-input';
import ItemForm from '@backCmp/forms/ItemForm';
import InputEventElem from '@components/formElems/InputEventElem';
import MultipleElem from '@components/formElems/MultipleElem';

export default {
  name: 'SlideForm',
  components: {
    PictureInput,
    ItemForm,
    InputEventElem,
    MultipleElem,
  },
  mixins: [uploadMixin, itemFormMixin],
  data() {
    const data = {
      uploadingImage: null,
      fields: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Технология',
        },
      ],
      propTemplate: { name: '' },
    };

    if (!this.item) {
      return { ...data, ...this.defaultFields() };
    }

    return {
      ...data,
      title: this.item.title,
      link: this.item.link,
      image: this.item.image,
      techs: exist('techs', this.item)
        ? this.item.techs.map(item => {
            return { name: item };
          })
        : [],
    };
  },
  validations: {
    title: {
      required,
    },
    link: {
      required,
    },
    techs: {
      required,
      $each: {
        name: {
          required,
        },
      },
    },
  },
  computed: {
    imageName() {
      if (!this.id) {
        return '';
      }

      if (!this.uploadingImage) {
        return '';
      }

      return this.uploadingImage.name;
    },
    imagePreview() {
      return '/upload/slider/xl/' + this.getFullImageName(this.image);
    },
  },
  methods: {
    // getIndex(index) {
    //   return parseInt(index) + 1;
    // },
    defaultFields() {
      return {
        title: '',
        link: '',
        image: '',
        techs: [
          {
            name: 'HTML',
          },
          {
            name: 'CSS',
          },
          {
            name: 'JavaScript',
          },
        ],
      };
    },
    prepareData() {
      this.submitData = {
        title: this.title,
        link: this.link,
        image: this.imageName ? this.imageName : this.image,
        techs: this.techs.map(item => item.name),
      };
    },
    getFullImageName(name) {
      return `${this.id}_${name}`;
    },
    changeImage() {
      this.uploadingImage = this.$refs.pictureInput.file;
    },
    removeImage() {
      this.uploadingImage = null;
    },
    uploadImage() {
      const form = new FormData();
      form.append(
        'image',
        this.uploadingImage,
        this.getFullImageName(this.uploadingImage.name),
      );

      axios.post(this.getUploadPage('slider'), form).then(res => {
        this.fileMsg = res.data.msg;

        if (res.data.status == SUCCESS) {
          this.uploadingImage = null;
          this.$refs.upload.value = null;
        }

        console.log('image upload response > ', res);
      });
    },
    submit() {
      if (this.$v.$invalid) {
        return false;
      }

      // if (this.$v.$anyDirty) {
      this.sendData();
      // }

      if (this.imageName) {
        this.uploadImage();
      }

      return true;
    },
  },
};
</script>
