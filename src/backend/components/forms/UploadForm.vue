<template lang="pug">
div
  AdminFormWrapper.upload_form(
    v-for='(item, index) in images',
    :key='index',
    @submit.prevent.native='uploadImage(index)'
  )
    h3.section-title Изображение: "{{ item.title }}"
    cropper(
      ref='croppers',
      :src='image(index)',
      :backgroundClass='"upload_form-cropper--bg"',
      :stencil-component='stencilComp',
      :stencil-props='stencilProps',
      :resizeImage='false',
      @ready='handle(index, "readyHandle")',
      @error='handle(index, "errorHandle")'
    )
    .form-row.form-row--buttons
      input(
        v-if='index == 0',
        type='file',
        :ref='"file" + index',
        @change='loadImage($event, index)',
        accept='image/*'
      )
      ButtonElem(:addClasses='buttonWrapperClass') clip image
</template>

<script>
import axios from 'axios';
import { Fragment } from 'vue-fragment';
import { CircleStencil, Cropper } from 'vue-advanced-cropper';
import uploadMixin from '@backend/mixins/uploadMixin';
import AdminFormWrapper from '@backCmp/AdminFormWrapper';
import ButtonElem from '@components/formElems/ButtonElem';

export default {
  name: 'UploadForm',
  components: {
    Fragment,
    AdminFormWrapper,
    Cropper,
    CircleStencil,
    ButtonElem,
  },
  mixins: [uploadMixin],
  props: {
    page: { type: String, required: true },
    layer: { type: Number, default: -1 },
    ext: { type: String, default: 'jpg' },
    isRound: { type: Boolean, default: false },
    breakpoints: {
      type: Array,
      default() {
        return null;
      },
    },
    stencilProps: {
      type: Object,
      default() {
        return {};
      },
    },
    cropSize: {
      type: Object,
      default() {
        return null;
      },
    },
    readyHandle: {
      type: Function,
      default: () => {
        return;
      },
    },
    errorHandle: {
      type: Function,
      default: () => {
        return;
      },
    },
  },
  data() {
    return {
      // resultURL: '',
      images: [],
    };
  },
  computed: {
    // images() {
    //   return this.breakpoints
    //     ? this.breakpoints.map(title => {
    //         return { title, value: null };
    //       })
    //     : [{ title: this.page, value: null }];
    // },
    stencilComp() {
      const COMP = this.isRound ? 'CircleStencil' : 'RectangleStencil';
      return this.$options.components[COMP];
    },
    buttonWrapperClass() {
      return {
        'form-col': true,
        'form-btn--disabled': this.disabled,
      };
    },
  },
  methods: {
    handle(index, eventMethod) {
      if (index) {
        return;
      }
      this[eventMethod]();
    },
    image(index) {
      if (this.images[index].value) {
        return this.images[index].value;
      }

      const root = '/upload';
      const dir =
        this.layer >= 0 ? `${this.page}/layer_${this.layer}` : this.page;

      if (this.breakpoints) {
        const prevIndex = index == 0 ? index : index - 1;
        return `${root}/${dir}/${this.images[prevIndex].title}.${this.ext}`;
      }

      return `${root}/${dir}.${this.ext}`;
    },
    dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const bb = new Blob([ab], { type: mimeString });
      return bb;
    },
    reset(index) {
      this.images[index].value = null;
    },
    loadImage(event, index) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.images[index].value = e.target.result;

          if (this.cropSize) {
            const { width, height } = this.cropSize;
            this.$refs.croppers[index].setCoordinates(
              (coordinates, imageSize) => ({
                width,
                height,
                left: imageSize.width / 2 - width / 2,
                top: imageSize.height / 2 - height / 2,
              }),
            );
          }
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    uploadImage(index) {
      const { canvas } = this.$refs.croppers[index].getResult();

      if (canvas) {
        const $vm = this;
        const form = new FormData();
        // this.resultURL = canvas.toDataURL(`image/${this.ext}`, 1);

        form.append(
          'image',
          // this.dataURItoBlob(this.resultURL),
          this.dataURItoBlob(canvas.toDataURL(`image/${this.ext}`, 1)),
          `${this.images[index].title}.${this.ext}`,
        );

        axios
          .post(this.getUploadPage(this.page, this.layer), form)
          .then(res => {
            $vm.fileMsg = res.data.message;

            // if (res.data.status === "Ok") {
            //   this.resultURL = "";
            //   // this.$refs.upload.value = null;
            // }
          });
      }
    },
  },
  created() {
    if (this.breakpoints) {
      const tempArray = [];

      this.breakpoints.map(title => {
        tempArray.push({ title, value: null });
      });

      this.images = tempArray.reverse();
    } else {
      this.images = [{ title: this.page, value: null }];
    }
  },
};
</script>

<style lang="scss">
.upload_form {
  &-container {
    display: flex;
    flex-wrap: wrap;
  }

  .container &-col {
    width: 50%;
  }

  .vue-advanced-cropper__image-wrapper {
    background-color: $white;
  }

  &-placeholder {
    text-align: center;
    padding: 20px;
    background-color: lightgray;
  }
}
</style>
