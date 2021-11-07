const path = require('path');
const result = require('dotenv').config();
const result2 = require('dotenv').config({ path: '.env.development.local' });
const { IS_DEV, SERVER_PORT, CLIENT_PATH } = require('./helpers');

console.log(result);
console.log(result2);

const {
  VUE_APP_SERVER_PROTOCOL,
  VUE_APP_SERVER_HOST,
  VUE_APP_SERVER_URL,

  SESSION_SECRET,
  SESSION_KEY,

  JWT_SIGNATURE,
  JWT_EXPIRATION,

  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_SALT,

  SMTP_SECURE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_EMAIL,
  SMTP_PASSWORD,
} = process.env;
const ROOT_PATH = IS_DEV ? 'public' : CLIENT_PATH;

module.exports = {
  client: {
    NAME: 'Vue Server',
    PORT: IS_DEV ? 5000 : SERVER_PORT,
    PROD_PATH: CLIENT_PATH,
    UPLOAD_PATH: path.join(ROOT_PATH, 'upload'),
  },
  server: {
    NAME: 'API Server',
    PROTOCOL: VUE_APP_SERVER_PROTOCOL,
    HOST: VUE_APP_SERVER_HOST,
    PORT: SERVER_PORT,
    URL: VUE_APP_SERVER_URL,
  },
  session: {
    SECRET: SESSION_SECRET,
    KEY: SESSION_KEY,
  },
  jwt: {
    SIGNATURE: JWT_SIGNATURE,
    EXPIRATION: JWT_EXPIRATION,
  },
  db: {
    HOST: DB_HOST,
    NAME: DB_NAME,
    USER: DB_USER,
    PASSWORD: DB_PASSWORD,
    SALT: DB_SALT,
  },
  mail: {
    SUBJECT: 'Сообщение с сайта',
  },
  smtp: {
    SECURE: SMTP_SECURE,
    HOST: SMTP_HOST,
    PORT: SMTP_PORT,
    EMAIL: SMTP_EMAIL,
    PASSWORD: SMTP_PASSWORD,
  },
};
