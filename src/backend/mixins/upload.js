import { server } from "@config";

export default {
  data() {
    return {
      uploadHost: `${server.PROTOCOL}://${server.HOST}:${server.PORT}`,
    };
  },
  methods: {
    getUploadPage(page) {
      return `${this.uploadHost}/image/${page}`;
    },
  },
};
