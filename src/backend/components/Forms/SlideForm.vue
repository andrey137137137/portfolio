<template lang="pug">
ItemForm(
  :handleSubmit='submit',
  :handleDelete='removeItem',
  :id='id',
  :disabled='disabled'
)
  .form_images
    div
      .img_wrap
        img.img_wrap-img(
          v-for='(item, index) in imageNames',
          :src='imagePreview(index)',
          :alt='item'
        )
      ButtonElem(
        v-show='item',
        :isDanger='true',
        @click.prevent.native='removeUploadedImage(index)'
      ) Удалить изображение
  .form_images
    PictureInput(
      v-for='(item, index) in images',
      removeButtonClass='ui red button',
      accept='image/jpeg, image/png, image/gif',
      buttonClass='ui button primary',
      :ref='"pictureInput" + index',
      :removable='true',
      :customStrings='{ upload: "<h1>Bummer!</h1>", drag: "Drag a 😺 JPEG, PNG or GIF" }',
      @change='changeImage(index)',
      @remove='removeImage(index)'
    )
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
import { exist } from '@apiHelpers';
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
      images: [null, null, null],
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
      imageNames: this.item.imageNames,
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
  methods: {
    defaultFields() {
      return {
        title: '',
        link: '',
        imageNames: '',
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
        imageNames: this.imageNames,
      };
      const techs = this.techs.map(item => item.name);
      const form = new FormData();
      let index;
      let isUploadingImageName = false;

      for (index = 0; index < this.images.length; index++) {
        if (this.images[index]) {
          isUploadingImageName = true;
          break;
        }
      }

      if (isUploadingImageName) {
        data.imageNames[index] = this.images[index].name;
        form.append('image', this.images[index], this.images[index].name);
      }

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          form.append(key, data[key]);
        }
      }

      form.append('techs', JSON.stringify(techs));

      this.submitData = form;
    },
    getUploadingImageName(index = -1) {
      if (!this.images[index]) {
        return '';
      }

      return this.images[index].name;
    },
    imagePreview(index) {
      return (
        '/upload/slider/xl/' +
        this.getFullImageName(this.id, this.imageNames[index]) +
        index
      );
    },
    changeImage(index) {
      this.images[index] = this.$refs.pictureInput.file;
    },
    removeImage(index) {
      this.images[index] = null;
    },
    removeUploadedImage(index) {
      this.imageNames[index] = '';

      this.removeImage();
      this.submit();
    },
  },
};
</script>

<style lang="scss">
.form_images {
  display: flex;
  justify-content: space-between;
}
</style>
