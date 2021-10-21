<template lang="pug">
PageWrapper
  ul.menu(v-show='isLoaded')
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
  UploadForm(
    :page='"parallax"',
    :breakpoints='breakpoints',
    :stencilProps='stencilProps',
    :layer='curLayer',
    :readyHandle='readyHandle',
    :errorHandle='errorHandle',
    ext='png'
  )
  //- v-if='areLayers',
</template>

<script>
import { getBreakpointNames } from '@apiHelpers';
import { SET_SUCCESS_MESSAGE } from '@common/store/mutation-types';
import ButtonElem from '@components/formElems/ButtonElem';
import PageWrapper from '@backCmp/PageWrapper';
import UploadForm from '@backCmp/forms/UploadForm';

import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex';
const parallaxMapGetters = createNamespacedHelpers('parallax').mapGetters;
const parallaxMapActions = createNamespacedHelpers('parallax').mapActions;

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
    ...mapGetters(['message']),
    ...parallaxMapGetters(['count']),
    compCount: {
      get() {
        return this.count > 0 ? this.count : 0;
      },
      set(value) {
        this.layers = value;
      },
    },
    areLayers() {
      return this.layers;
    },
    breakpoints() {
      return getBreakpointNames();
    },
    menuLinkClasses() {
      return { 'menu-link--active': this.curLayer };
    },
  },
  methods: {
    ...mapActions([SET_SUCCESS_MESSAGE]),
    ...parallaxMapActions(['deleteLayer', 'readCount']),
    addLayer() {
      console.log(this.layers);
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
      this.deleteLayer(layer);
    },
    readyHandle() {
      if (!this.isLoaded) {
        this.addLayer();
        this.curLayer = this.layers;
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
    this.readCount();
    this.layers = this.compCount;
  },
};
</script>

<style lang="scss">
.menu {
  color: $white;
}
</style>
