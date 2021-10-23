<template lang="pug">
PageWrapper
  ul.menu
    li.menu-item(v-for='(layer, index) in layers', :key='index')
      a.menu-link.btn(
        href='',
        :class='menuLinkClasses',
        @click.prevent='setCurLayer(index)'
      ) {{ getLayerTitle(index) }}
      ButtonElem(
        v-if='index == layers - 1',
        :isDanger='true',
        @click.prevent.native='remove(index)'
      ) удалить
    li.menu-item
      a.menu-link.btn(href='', @click.prevent='setNewLayer') {{ newLayerTitle }}
    //- ul.menu(v-show='isLoaded')
  UploadForm(
    page='parallax',
    :breakpoints='breakpoints',
    :stencilProps='stencilProps',
    :layer='curLayer',
    :readyHandle='readyHandle',
    :errorHandle='errorHandle',
    ext='png'
  )
  //- :style='isVisibleForm',
</template>

<script>
import { getPositiveValue, getBreakpointNames } from '@apiHelpers';
import pageDataMixin from '@backend/mixins/pageDataMixin';
import ButtonElem from '@components/formElems/ButtonElem';
import PageWrapper from '@backCmp/PageWrapper';
import UploadForm from '@backCmp/forms/UploadForm';

import { mapActions } from 'vuex';

export default {
  name: 'Parallax',
  components: {
    PageWrapper,
    UploadForm,
    ButtonElem,
  },
  mixins: [pageDataMixin],
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
      isClickedNewLayer: false,
      isLoaded: false,
    };
  },
  computed: {
    newLayerTitle() {
      return this.isClickedNewLayer
        ? this.getLayerTitle(this.layers)
        : 'Новый слой';
    },
    areLayers() {
      return this.layers;
    },
    isVisibleForm() {
      const value = this.areLayers ? 'block' : 'none';
      return {
        display: value,
      };
    },
    breakpoints() {
      return getBreakpointNames();
    },
    menuLinkClasses() {
      return { 'menu-link--active': this.curLayer };
    },
  },
  methods: {
    ...mapActions(['updateData']),
    getLayerTitle(index) {
      return `Слой №${index + 1}`;
    },
    // addLayer() {
    //   this.layers++;
    // },
    setCurLayer(index) {
      this.curLayer = index;
      this.isClickedNewLayer = false;
    },
    setLastLayer() {
      this.curLayer = this.layers - 1;
      if (this.curLayer < 0) {
        this.isClickedNewLayer = true;
        this.curLayer = 0;
      }
    },
    setNewLayer() {
      // this.addLayer();
      // this.setLastLayer();
      this.curLayer = this.layers;
      this.isClickedNewLayer = true;
    },
    remove(layer) {
      this.updateData({
        id: layer,
        data: { count: getPositiveValue(this.layers - 1) },
      });
    },
    readyHandle() {
      // if (!this.isLoaded) {
      //   this.addLayer();
      //   this.curLayer = this.layers;
      // }
    },
    errorHandle() {
      // if (!this.isLoaded) {
      //   this.isLoaded = true;
      //   this.setLastLayer();
      // }
    },
  },
  watch: {
    dbData(newValue) {
      console.log(this.isLoaded);
      console.log(newValue);
      this.isLoaded = true;
      this.layers = newValue[0].count;
      this.setLastLayer();
    },
  },
};
</script>

<style lang="scss">
.menu {
  color: $white;
}
</style>
