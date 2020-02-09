import { server } from "@/../api/config";

export default {
  data() {
    return {
      uploadHost: `${server.protocol}://${server.host}:${server.port}`
    };
  },
  methods: {
    getUploadPage(page) {
      return `${this.uploadHost}/image/${page}`;
    }
  }
};
