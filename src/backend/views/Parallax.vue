<template lang="pug">
PageWrapper
  ul.menu(v-show='isLoaded')
    li(v-for='(layer, index) in count', :key='index')
      a.menu-link.btn(
        href='',
        :class='menuLinkClasses',
        v-for='(layer, index) in count',
        :key='index',
        @click.prevent='curLayer = index'
      ) Слой №{{ index + 1 }}
      ButtonElem(
        v-for='(layer, index) in count',
        :key='index',
        :isDanger='true',
        @click.prevent.native='remove(index)'
      ) удалить
    li
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
import axios from 'axios';
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
      count: 0,
      curLayer: 0,
      isLoaded: false,
    };
  },
  computed: {
    ...mapGetters(['message']),
    ...parallaxMapGetters(['layers']),
    menuLinkClasses() {
      return { 'menu-link--active': this.curLayer };
    },
  },
  methods: {
    ...mapActions(['readLayers']),
    ...parallaxMapActions(['readLayers']),
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
    remove(layer) {
      axios.delete('parallax/' + layer).then(res => {
        if (res.data.success) {
          [SET_SUCCESS_MESSAGE](res.data.message);
        }
      });
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
