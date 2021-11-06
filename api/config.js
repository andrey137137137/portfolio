const path = require('path');
const result = require('dotenv').config({
  path: '.env.development.local',
});
const { IS_DEV } = require('./helpers');

console.log(result);

const {
  PROTOCOL,
  HOST,
  PORT,

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
const PROD_PATH = 'client';
const ROOT_PATH = IS_DEV ? 'public' : PROD_PATH;
const SERVER_PORT = PORT || 3000;

module.exports = {
  client: {
    NAME: 'Vue Server',
    PORT: IS_DEV ? 5000 : SERVER_PORT,
    PROD_PATH,
    UPLOAD_PATH: path.join(ROOT_PATH, 'upload'),
  },
  server: {
    NAME: 'API Server',
    PROTOCOL,
    HOST,
    PORT: SERVER_PORT,
    URL: '/api/',
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
