<template lang="pug">
PageWrapper
  .menu
    a.menu-link.btn(
      href='',
      :class='menuLinkClasses',
      v-for='(layer, index) in layers',
      :key='index',
      @click='curLayer = index'
    ) Слой №{{ index + 1 }}
  UploadForm(
    :page='folder + "/layer_" + curLayer',
    :breakpoints='layers[curLayer].breakpoints',
    :stencilProps='stencilProps',
    ext='png'
  )
</template>

<script>
import PageWrapper from '@backCmp/PageWrapper';
import UploadForm from '@backCmp/forms/UploadForm';

export default {
  name: 'Parallax',
  components: {
    PageWrapper,
    UploadForm,
  },
  props: {
    folder: {
      type: String,
      required: true,
    },
    layers: {
      type: Array,
      required: true,
    },
    stencilProps: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      curLayer: 0,
    };
  },
  computed: {
    menuLinkClasses() {
      return { 'menu-link--active': this.curLayer };
    },
  },
};
</script>
