<template lang="pug">
PageWrapper
  .menu(v-show='isLoaded')
    a.menu-link.btn(
      href='',
      :class='menuLinkClasses',
      v-for='(layer, index) in layers',
      :key='index',
      @click='curLayer = index'
    ) Слой №{{ index + 1 }}
  UploadForm(
    :page='"parallax/layer_" + curLayer',
    :breakpoints='["sm", "md", "lg", "xlg"]',
    :stencilProps='stencilProps',
    :layer='curLayer',
    :readyHandle='readyHandle',
    :errorHandle='errorHandle',
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
      isLoaded: false,
    };
  },
  computed: {
    menuLinkClasses() {
      return { 'menu-link--active': this.curLayer };
    },
  },
  methods: {
    readyHandle() {
      if (!this.isLoaded) {
        this.layers++;
        this.curLayer = this.layers;
        console.log(this.curLayer + ' in ' + this.layers);
      }
    },
    errorHandle() {
      if (!this.isLoaded) {
        this.isLoaded = true;
        this.curLayer = this.layers - 1;
      }
    },
  },
};
</script>

<style lang="scss">
.menu {
  color: $white;
}
</style>
