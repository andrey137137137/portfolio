<template lang="pug">
PageWrapper
  UploadForm(
    v-for='(layer, index) in layers',
    :key='index',
    :page='folder + "layer_" + (index + 1)',
    :breakpoints='layer.breakpoints',
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
};
</script>
