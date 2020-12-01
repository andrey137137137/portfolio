<template lang="pug">
ItemForm(
  :handleSubmit='submit',
  :handleDelete='removeItem',
  :id='id',
  :disabled='disabled'
)
  .img_wrap
    img.img_wrap-img(:src='imagePreview', :alt='uploadingImageName')
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
  ButtonElem(
    v-show='imageName',
    :isDanger='true',
    @click.prevent.native='removeUploadedImage'
  ) Удалить изображение
  InputEventElem(v-model='title', :val='$v.title', placeholder='Название')
  InputEventElem(v-model='link', :val='$v.link', placeholder='Ссылка')
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
// import axios from 'axios';
// import { SUCCESS } from '@httpSt';
import exist from '@common/helpers/exist';
import imageMixin from '@common/mixins/imageMixin';
import uploadMixin from '@backend/mixins/uploadMixin';
import itemFormMixin from '@backend/mixins/itemFormMixin';
import PictureInput from 'vue-picture-input';
import ItemForm from '@backCmp/forms/ItemForm';
import InputEventElem from '@components/formElems/InputEventElem';
import ButtonElem from '@components/formElems/ButtonElem';
import MultipleElem from '@components/formElems/MultipleElem';

export default {
  name: 'SlideForm',
  components: {
    PictureInput,
    ItemForm,
    InputEventElem,
    ButtonElem,
    MultipleElem,
  },
  mixins: [imageMixin, uploadMixin, itemFormMixin],
  data() {
    const data = {
      image: null,
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
      imageName: this.item.imageName,
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
    uploadingImageName() {
      if (!this.image) {
        return '';
      }

      return this.image.name;
    },
    imagePreview() {
      return (
        '/upload/slider/xl/' + this.getFullImageName(this.id, this.imageName)
      );
    },
  },
  methods: {
    defaultFields() {
      return {
        title: '',
        link: '',
        imageName: '',
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
      const data = {
        title: this.title,
        link: this.link,
        imageName: this.uploadingImageName
          ? this.uploadingImageName
          : this.imageName,
      };
      const techs = this.techs.map(item => item.name);
      const form = new FormData();

      if (this.uploadingImageName) {
        form.append('image', this.image, this.image.name);
      }

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          form.append(key, data[key]);
        }
      }

      form.append('techs', JSON.stringify(techs));

      this.submitData = form;
    },
    changeImage() {
      this.image = this.$refs.pictureInput.file;
    },
    removeImage() {
      this.image = null;
    },
    removeUploadedImage() {
      this.imageName = '';

      this.removeImage();
      this.submit();
    },
  },
};
</script>
