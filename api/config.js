const { isDev } = require('./helpers');
const path = require('path');
const config = {
  server: {
    PROTOCOL: 'http',
    HOST: 'localhost',
    PORT: 3000,
    FRONT_PORT: 8080,
    URL: '/api/',
  },
  session: {
    SECRET: 'kjfnksbfksdbkfej',
    KEY: 'testing_key',
  },
  jwt: {
    SIGNATURE: 'test',
    EXPIRATION: '7h',
  },
  db: {
    HOST: 'ds233763.mlab.com',
    PORT: '33763',
    NAME: 'portfolio_db',
    USER: 'portfolio_db',
    PASSWORD: 'dfgERGHJGd452',
    SALT: 'ghjkhjhiugiugiug',
  },
  mail: {
    SUBJECT: 'Сообщение с сайта',
  },
  smtp: {
    SECURE: true,
    HOST: 'smtp.gmail.com',
    PORT: 465,
    EMAIL: 'someMail@gmail.com',
    PASSWORD: 'mailPassword',
  },
  client: {
    ROOT_DEV_PATH: 'src',
    ASSETS_PATH: 'assets',
    UPLOADING_PATH: '',
  },
};
const rootPath = isDev ? path.join('src', 'assets') : 'assets';

config.UPLOADING_PATH = path.join(rootPath, 'upload');

module.exports = config;
