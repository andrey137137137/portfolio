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
    :page='"parallax/layer_" + curLayer',
    :breakpoints='breakpoints',
    :stencilProps='stencilProps',
    ext='png'
  )
  div
    ButtonElem Добавить слой
</template>

<script>
import PageWrapper from '@backCmp/PageWrapper';
import UploadForm from '@backCmp/forms/UploadForm';
import ButtonElem from '@components/formElems/ButtonElem';

export default {
  name: 'Parallax',
  components: {
    PageWrapper,
    UploadForm,
    ButtonElem,
  },
  props: {
    stencilProps: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      layers: 0,
      curLayer: 0,
      breakpoints: ['sm', 'md', 'lg'],
    };
  },
  computed: {
    menuLinkClasses() {
      return { 'menu-link--active': this.curLayer };
    },
  },
};
</script>
