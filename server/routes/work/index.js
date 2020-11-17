const router = require('express').Router();
const Model = require('mongoose').model('work');
const { IncomingForm } = require('formidable');

const { isAuth } = require('@auth');
const crud = require('@contr/crud');
const image = require('@contr/image');

router.get('/', (req, res) => {
  crud.getItems(Model, res, { title: 1 });
});

router.post('/', isAuth, (req, res) => {
  const form = new IncomingForm();
  form.parse(req, (err, fields, files) => {
    console.log('fields:', fields);
    console.log('files:', files);
    image.upload(req, res, 'slider');
    crud.createItem(Model, fields, res);

    if (cb === false) {
      Model[FUNC](filter, { $set: data })
        .then(result => {
          sendResult(result, res, 'update');
        })
        .catch(err => {
          sendError(err, res, 'update');
        });
    } else {
      waterfall(
        [
          cb => {
            Model[FUNC](filter, { $set: data }, cb);
          },
          (result, cb) => {
            cb(null, result);
          },
        ],
        (err, result) => {
          if (err) {
            sendError(err, res, 'update');
            return;
          }

          sendResult(result, res, 'update');
        },
      );
    }
  });

  // const { title, link, image, techs } = req.body;
});

router.put('/:id', isAuth, (req, res) => {
  const { title, link, image, techs } = req.body;
  crud.updateItem(
    Model,
    req.params.id,
    {
      title,
      link,
      image,
      techs,
    },
    res,
  );
});

router.delete('/:id', isAuth, (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
});

module.exports = router;
