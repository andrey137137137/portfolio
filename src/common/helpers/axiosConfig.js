import axios from 'axios';
import myConfig from '@config';

export default () => {
  axios.interceptors.request.use(
    config => {
      const { PROTOCOL, HOST, PORT, URL } = myConfig.server;

      config.baseURL = `${PROTOCOL}://${HOST}:${PORT}${URL}`;
      config.timeout = 5000;
      config.headers = { 'Content-Type': 'application/json' };
      config.withCredentials = true;

      return config;
    },
    err => {
      if (isDev()) console.log(err.response.status);
      return Promise.reject();
    },
  );
};
