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
    :breakpoints='["sm", "md", "lg", "xl"]',
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
      layers: 0,
      curLayer: 0,
      isLoaded: false,
    };
  },
  computed: {
    ...mapGetters(['message']),
    ...parallaxMapGetters(['count']),
    menuLinkClasses() {
      return { 'menu-link--active': this.curLayer };
    },
  },
  methods: {
    ...mapActions([SET_SUCCESS_MESSAGE]),
    ...parallaxMapActions(['readCount']),
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
      axios.delete('parallax/' + layer).then(res => {
        if (res.data.success) {
          [SET_SUCCESS_MESSAGE](res.data.message);
        }
      });
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
    this.layers = this.count;
  },
};
</script>

<style lang="scss">
.menu {
  color: $white;
}
</style>
