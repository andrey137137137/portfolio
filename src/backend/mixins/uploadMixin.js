import { server } from '@config';

export default {
  data() {
    return {
      uploadHost: `${server.PROTOCOL}://${server.HOST}:${server.PORT}${server.URL}`,
    };
  },
  methods: {
    getUploadPage(page, layer) {
      const PARALLAX_PAGE = 'parallax';
      let url = this.uploadHost;

      if (page == PARALLAX_PAGE) {
        url += PARALLAX_PAGE;
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
