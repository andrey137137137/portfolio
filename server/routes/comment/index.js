const nodemailer = require('nodemailer');
const waterfall = require('async/waterfall');
const router = require('express').Router();
const Model = require('mongoose').model('comment');

// const { HOST, PORT, SECURE, EMAIL, PASSWORD } = require('@config').smtp;
// const { IS_DEV } = require('./helpers');
const { isAuth } = require('@auth');
const crud = require('@contr/crud');
const { waterfallCB } = require('@contr/image');

router.get('/:for', (req, res) => {
  const sort = { date: 1 };
  const filter = {};

  if (req.params.for == 'front') {
    filter.isPublished = true;
  }

  crud.getItems(Model, res, sort, { filter });
});

router.post('/', isAuth, (req, res) => {
  const { author, position, email, description } = req.body;
  // const testEmailAccount = await nodemailer.createTestAccount();
  // const transporter = nodemailer.createTransport({
  //   host: IS_DEV ? 'smtp.ethereal.email' : HOST,
  //   port: PORT,
  //   secure: SECURE,
  //   auth: {
  //     user: EMAIL,
  //     pass: PASSWORD,
  //   },
  // });

  waterfall(
    [
      cb => {
        crud.createItem(
          Model,
          res,
          {
            author,
            position,
            email,
            description,
          },
          cb,
        );
      },
      (result, cb) => {
        const Vue = require('vue');
        const app = new Vue({
          data: {
            name: result.author,
          },
          template: `<div>{{name}}</div>`,
        });
        const renderer = require('vue-server-renderer').createRenderer();
        renderer.renderToString(app, cb);
      },
      (result, cb) => {
        const { EMAIL, PASSWORD } = require('@config').smtp;
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: EMAIL,
            pass: PASSWORD,
          },
        });
        transporter.sendMail(
          {
            from: '"Node js" <nodejs@example.com>',
            to: 'user@example.com, user@example.com',
            subject: 'Message from Node js',
            text: 'This message was sent from Node js server.',
            html: result,
          },
          cb,
        );
      },
    ],
    (err, result) => {
      return waterfallCB(err, result, res, 'insert');
    },
  );
});

router.put('/:id', isAuth, (req, res) => {
  const { author, position, email, description, date, isPublished } = req.body;
  crud.updateItem(Model, res, req.params.id, {
    author,
    position,
    description,
    email,
    date: new Date(date),
    isPublished,
  });
});

router.delete('/:id', isAuth, (req, res) => {
  crud.deleteItem(Model, res, req.params.id);
});

module.exports = router;
