<template lang="pug">
PageWrapper
  UploadForm(
    page='avatar',
    :isRound='true',
    :stencilProps='stencilProps',
    :cropSize='cropSize'
  )
  ProfileForm(v-for='item in dbData', :key='item.old', :params='item')
</template>

<script>
import uploadMixin from '@backend/mixins/uploadMixin';
import userPageDataMixin from '@backend/mixins/userPageDataMixin';
import PageWrapper from '@backCmp/PageWrapper';
import UploadForm from '@backCmp/forms/UploadForm';
import ProfileForm from '@backCmp/forms/ProfileForm';

export default {
  name: 'AdminProfileView',
  components: {
    PageWrapper,
    UploadForm,
    ProfileForm,
  },
  mixins: [uploadMixin, userPageDataMixin],
  data() {
    return {
      stencilProps: {
        aspectRatio: 1,
      },
      cropSize: {
        width: 141,
        height: 141,
      },
    };
  },
};
</script>
