<template lang="pug">
PageWrapper
  .menu(v-show='isLoaded')
    a.menu-link.btn(
      href='',
      :class='menuLinkClasses',
      v-for='(layer, index) in count',
      :key='index',
      @click.prevent='curLayer = index'
    ) Слой №{{ index + 1 }}
    a.menu-link.btn(href='', @click.prevent='setNewLayer') Новый слой
  UploadForm(
    :page='"parallax"',
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

import createNamespacedHelpers from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('parallax');

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
      count: 0,
      curLayer: 0,
      isLoaded: false,
    };
  },
  computed: {
    ...mapGetters(['layers']),
    menuLinkClasses() {
      return { 'menu-link--active': this.curLayer };
    },
  },
  methods: {
    ...mapActions(['readLayers']),
    addLayer() {
      this.count++;
    },
    setLastLayer() {
      this.curLayer = this.count - 1;
    },
    setNewLayer() {
      this.addLayer();
      this.setLastLayer();
    },
    readyHandle() {
      if (!this.isLoaded) {
        this.addLayer();
        this.curLayer = this.count;
      }
    },
    errorHandle() {
      if (!this.isLoaded) {
        this.isLoaded = true;
        this.setLastLayer();
      }
    },
  },
  created() {
    this.readLayers();
    this.count = this.layers;
  },
};
</script>

<style lang="scss">
.menu {
  color: $white;
}
</style>
