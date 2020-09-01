<template lang="pug">
PageWrapper
  HeaderWrapper
    NavCmp
    HeaderContent
    ScrollButton
  router-view
  MainMenu
</template>

<script>
import menuCheckerMixin from '@frontend/mixins/menuCheckerMixin';
import PageWrapper from '@frontCmp/PageWrapper';
import HeaderWrapper from '@frontCmp/header/HeaderWrapper';
import NavCmp from '@frontCmp/NavCmp';
import HeaderContent from '@frontCmp/header/HeaderContent';
import ScrollButton from '@frontCmp/ScrollButton';
import MainMenu from '@frontCmp/NavCmp/MainMenu';

export default {
  name: 'SiteWrapper',
  components: {
    PageWrapper,
    HeaderWrapper,
    NavCmp,
    HeaderContent,
    ScrollButton,
    MainMenu,
  },
  mixins: [menuCheckerMixin],
};
</script>
