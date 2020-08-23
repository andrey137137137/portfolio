<template lang="pug">
#bottomWrapper.section.bottom_wrap(:class='addClasses', ref='bottomWrapper')
  slot
</template>

<script>
import addClassesMixin from '@common/mixins/addClassesMixin';

import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('bottomParallaxHeight');

export default {
  name: 'BottomWrapper',
  mixins: [addClassesMixin],
  methods: {
    ...mapActions(['setBottomHeight']),
  },
  updated() {
    this.setBottomHeight(this.$refs['bottomWrapper'].offsetHeight);
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/BottomWrapper/import';
</style>
