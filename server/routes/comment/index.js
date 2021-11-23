const nodemailer = require('nodemailer');
const waterfall = require('async/waterfall');
const router = require('express').Router();
const Model = require('mongoose').model('comment');

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
  const { author, position, description } = req.body;
  const EMAIL_FROM = req.body.email;

  waterfall(
    [
      cb => {
        crud.createItem(
          Model,
          res,
          {
            author,
            position,
            email: EMAIL_FROM,
            description,
          },
          cb,
        );
      },
      (context, cb) => {
        console.log(context);

        // const Vue = require('vue');
        // const app = new Vue({
        //   data: {
        //     name: context.author,
        //     status: context.position,
        //   },
        //   template: `<p><b>{{name}}</b> <i>{{status}}</i></p>`,
        // });
        // const app = require('@letterTemplate')(context);
        // const renderer = require('vue-server-renderer').createRenderer();
        // renderer.renderToString(app, cb);

        const { createBundleRenderer } = require('vue-server-renderer');
        const { IS_DEV } = require('@apiHelpers');

        function createRenderer(bundle, options) {
          return createBundleRenderer(
            bundle,
            Object.assign(options, {
              // recommended for performance
              runInNewContext: false,
            }),
          );
        }

        let renderer;
        let readyPromise;

        if (IS_DEV) {
          // In development: setup the dev server with watch and hot-reload,
          // and create a new renderer on bundle update.
          readyPromise = require('./build/setup-dev-server')(
            (bundle, options) => {
              renderer = createRenderer(bundle, options);
            },
          );
        } else {
          // In production: create server renderer using built server bundle.
          // The server bundle is generated by vue-ssr-webpack-plugin.
          const bundle = require('./dist/vue-ssr-server-bundle.json');
          renderer = createRenderer(bundle, {});
        }

        function render(context) {
          renderer.renderToString(context, cb);
        }

        app.get(
          '*',
          !IS_DEV
            ? render(context)
            : context => {
                readyPromise.then(() => render(context));
              },
        );
      },
      (result, cb) => {
        console.log(result);
        const { EMAIL, PASSWORD } = require('@config').smtp;
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: EMAIL,
            pass: PASSWORD,
          },
          tls: { rejectUnauthorized: false },
        });
        transporter.sendMail(
          {
            from: EMAIL_FROM,
            to: EMAIL,
            subject: 'Portfolio comment',
            text: 'This message was sent from Node js server.',
            html: result,
          },
          cb,
        );
      },
    ],
    (err, result) => {
      console.log(err);
      console.log(result);
      return waterfallCB(err, result, res, 'insert');
    },
  );
});

router.put('/:id', isAuth, (req, res) => {
  const { author, position, email, description, isPublished } = req.body;
  crud.updateItem(Model, res, req.params.id, {
    author,
    position,
    description,
    email,
    isPublished,
  });
});

router.delete('/:id', isAuth, (req, res) => {
  crud.deleteItem(Model, res, req.params.id);
});

module.exports = router;
