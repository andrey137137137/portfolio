import { server } from "@config";

export default {
  data() {
    return {
      uploadHost: `${server.PROTOCOL}://${server.HOST}:${server.PORT}${server.URL}`
    };
  },
  methods: {
    getUploadPage(page) {
      return `${this.uploadHost}image/${page}`;
    }
  }
};
