import { server } from '@config';

export default {
  data() {
    return {
      uploadHost: `${server.PROTOCOL}://${server.HOST}:${server.PORT}${server.URL}`,
    };
  },
  methods: {
    getUploadPage(page, layer) {
      let url = `${this.uploadHost}image/${page}`;

      if (layer >= 0) {
        url += `/${layer}`;
      }

      return url;
    },
  },
};
