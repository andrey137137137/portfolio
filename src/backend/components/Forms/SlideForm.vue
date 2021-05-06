<template lang="pug">
ItemForm(
  :handleSubmit='submit',
  :handleDelete='removeItem',
  :id='id',
  :disabled='disabled'
)
  .form_images
    div(v-for='(item, index) in imageNames', :key='index')
      .img_wrap
        img.img_wrap-img(:src='imagePreview(index)', :alt='item')
      ButtonElem(
        v-show='item',
        :isDanger='true',
        @click.prevent.native='removeUploadedImage(index)'
      ) Удалить изображение
  .form_images
    PictureInput(
      v-for='(item, index) in images',
      :key='index',
      accept='image/jpeg, image/png, image/gif',
      buttonClass='btn form-btn',
      removeButtonClass='btn form-btn form-btn--danger',
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
import { exist, getSlideImageName } from '@apiHelpers';
import {
  required,
  // alphaNum,
  // minLength,
  // maxLength
} from 'vuelidate/lib/validators';
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
  mixins: [uploadMixin, itemFormMixin],
  data() {
    const data = {
      selectedImageIndex: -1,
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

    const { title, link, imageNames, techs } = this.item;

    return {
      ...data,
      title,
      link,
      imageNames: exist('imageNames', this.item) ? imageNames : ['', '', ''],
      techs: exist('techs', this.item)
        ? techs.map(item => {
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
        imageNames: ['', '', ''],
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
      const $vm = this;
      const selectedImages = [];
      const data = {
        title: this.title,
        link: this.link,
        selectedImageIndex: this.selectedImageIndex,
      };
      const techs = this.techs.map(item => item.name);
      const form = new FormData();

      let index;
      let isUplImageName = false;

      for (index = 0; index < this.images.length; index++) {
        if (this.images[index]) {
          isUplImageName = true;
          break;
        }
      }

      if (isUplImageName) {
        const uplImageName = this.images[index].name;
        this.imageNames[index] = uplImageName;
        data.selectedImageIndex = index;
        form.append('image', this.images[index], uplImageName);
      }

      this.images.forEach((image, index) => {
        const isImage = image ? 1 : 0;

        if (isImage) {
          $vm.imageNames[index] = image.name;
        }

        selectedImages.push(isImage);
      });

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          form.append(key, data[key]);
        }
      }

      form.append('selectedImages', JSON.stringify(selectedImages));
      form.append('imageNames', JSON.stringify(this.imageNames));
      form.append('techs', JSON.stringify(techs));

      this.submitData = form;
    },
    imagePreview(index) {
      return (
        '/upload/slider/xl/' +
        getSlideImageName(this.id, this.imageNames[index])
      );
    },
    changeImage(index) {
      this.images[index] = this.$refs['pictureInput' + index][0].file;
    },
    removeImage(index) {
      this.images[index] = null;
    },
    removeUploadedImage(index) {
      this.imageNames[index] = null;
      this.selectedImageIndex = index;
      this.removeImage(index);
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
