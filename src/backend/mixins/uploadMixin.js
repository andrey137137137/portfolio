// import { server } from '@config';
import { SERVER_BASE_URL } from '@common/helpers';
import { ADMIN_PARALLAX } from '@common/constants/router';

export default {
  data() {
    return {
      uploadHost: SERVER_BASE_URL,
    };
  },
  methods: {
    getUploadPage(page, layer) {
      let url = this.uploadHost;

      if (page == ADMIN_PARALLAX) {
        url += ADMIN_PARALLAX;
      } else {
        url += `image/${page}`;
      }

      if (layer >= 0) {
        url += `/${layer}`;
      }

      return url;
    },
  },
};
