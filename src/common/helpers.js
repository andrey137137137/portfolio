import axios from 'axios';
import { server } from '@config';
import { IS_DEV } from '@apiHelpers';
import {
  required,
  alphaNum,
  minLength,
  maxLength,
  helpers,
} from 'vuelidate/lib/validators';

export const getImg = (img, files) => {
  const start = img.lastIndexOf('.');
  const ext = img.slice(start + 1);

  return files[ext](`./${img}`);
};

export const axiosConfig = () => {
  axios.interceptors.request.use(
    config => {
      const { PROTOCOL, HOST, PORT, URL } = server;

      config.baseURL = `${PROTOCOL}://${HOST}:${PORT}${URL}`;
      config.timeout = 5000;
      config.headers = { 'Content-Type': 'application/json' };
      config.withCredentials = true;

      return config;
    },
    err => {
      if (IS_DEV) {
        console.log(err.response.status);
      }

      return Promise.reject();
    },
  );
};

export const getScrollY = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

export const checked = helpers.withParams(
  { type: 'checked' },
  value => !helpers.req(value) || value === true,
);

export const userAlphaNumValids = {
  required,
  alphaNum,
  minLength: minLength(6),
  maxLength: maxLength(16),
};

export const watchVar = ($vm, newValue) => {
  console.log($vm.$options.name);
  console.log(newValue);

  for (const key in newValue) {
    if (Object.hasOwnProperty.call(newValue, key)) {
      const prop = newValue[key];

      if (Array.isArray(prop)) {
        $vm[key] = $vm.getMultipleArray(newValue, key, $vm[key + 'Template']);
      } else {
        $vm[key] = prop;
      }
    }
  }
};
