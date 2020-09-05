<template lang="pug">
PageWrapper
  .menu(v-show='isLoaded')
    a.menu-link.btn(
      href='',
      :class='menuLinkClasses',
      v-for='(layer, index) in layers',
      :key='index',
      @click.prevent='curLayer = index'
    ) Слой №{{ index + 1 }}
    a.menu-link.btn(href='', @click.prevent='setNewLayer') Новый слой
  UploadForm(
    :page='"parallax/layer_" + curLayer',
    :breakpoints='["sm", "md", "lg", "xlg"]',
    :stencilProps='stencilProps',
    :layer='curLayer',
    :readyHandle='readyHandle',
    :errorHandle='errorHandle',
    ext='png'
  )
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
    addLayer() {
      this.layers++;
    },
    setLastLayer() {
      this.curLayer = this.layers - 1;
    },
    setNewLayer() {
      this.addLayer();
      this.setLastLayer();
    },
    readyHandle() {
      if (!this.isLoaded) {
        this.addLayer();
        this.curLayer = this.layers;
        console.log(this.curLayer + ' in ' + this.layers);
      }
    },
    errorHandle() {
      if (!this.isLoaded) {
        this.isLoaded = true;
        this.setLastLayer();
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
