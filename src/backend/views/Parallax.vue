<template lang="pug">
PageWrapper
  ul.menu
    li.menu-item(v-for='(layer, index) in layers', :key='index')
      a.menu-link.btn(
        href='',
        :class='menuLinkClasses',
        @click.prevent='curLayer = index'
      ) Слой №{{ index + 1 }}
      ButtonElem(
        v-if='index == layers - 1',
        :isDanger='true',
        @click.prevent.native='remove(index)'
      ) удалить
    li.menu-item
      a.menu-link.btn(href='', @click.prevent='setNewLayer') Новый слой
    //- ul.menu(v-show='isLoaded')
  UploadForm(
    :style='isVisibleForm',
    page='parallax',
    :breakpoints='breakpoints',
    :stencilProps='stencilProps',
    :layer='curLayer',
    :readyHandle='readyHandle',
    :errorHandle='errorHandle',
    ext='png'
  )
</template>

<script>
import { getBreakpointNames } from '@apiHelpers';
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
      isLoaded: false,
    };
  },
  computed: {
    // compCount: {
    //   get() {
    //     return this.count > 0 ? this.count : 0;
    //   },
    //   set(value) {
    //     this.layers = value;
    //   },
    // },
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
    remove(layer) {
      this.updateData({ id: layer, data: null });
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
    // dbPage(newValue) {
    //   console.log(newValue);
    //   this.layers = this.count;
    //   this.setLastLayer();
    // },
    dbData(newValue) {
      console.log(newValue);
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
