<template lang="pug">
  transition-group(
    :name="transitionName"
    :tag="rootElem"
    :class="addClasses"
    :css="false"
    appear
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  )
    span(
      v-for="(symbol, index) in str"
      :key="getSymbolKey(symbol, index)"
      :data-index="index"
      :class="spanAddClasses"
    ) {{symbol}}
</template>

<script>
import $ from 'jquery';

import addClassesMixin from '@common/mixins/addClassesMixin';

export default {
  name: 'AnimateStr',
  mixins: [addClassesMixin],
  props: {
    transitionName: {
      type: String,
      required: true,
    },
    str: {
      required: true,
    },
    commonKey: {
      type: Number,
      required: true,
    },
    rootElem: {
      type: String,
      default: 'div',
    },
    arrayGlue: {
      type: String,
      default: ', ',
    },
    spanAddClasses: {
      type: Array,
      default() {
        return [];
      },
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  computed: {
    length() {
      return this.str.length;
    },
    spanDuration() {
      return Math.ceil((this.duration * 10) / this.length);
    },
    spanDelay() {
      return Math.ceil((150 * 10) / this.length);
    },
  },
  methods: {
    getSymbolKey(symbol, index) {
      return this.commonKey + symbol + index;
    },
    beforeEnter: function(el) {
      el.style.opacity = 0;
    },
    enter: function(el, done) {
      setTimeout(function() {
        $(el).animate(
          {
            opacity: 1,
          },
          this.spanDuration,
          done,
        );
      }, el.dataset.index * this.spanDelay);
    },
    leave: function(el, done) {
      el.style.opacity = 0;
      done();
    },
  },
};
</script>
