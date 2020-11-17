const path = require('path');
const router = require('express').Router();
const Model = require('mongoose').model('work');
const { IncomingForm } = require('formidable');
const { waterfall, each } = require('async');
const sharp = require('sharp');

const { isAuth } = require('@auth');
const crud = require('@contr/crud');
const image = require('@contr/image');

const sliderDir = 'slider';
const sliderBreakpoints = [
  { name: 'xl', height: 525 },
  { name: 'lg', height: 257 },
  { name: 'md', height: 215 },
  { name: 'sm', height: 93 },
];

const uploadSlide = (res, filePath, fileName) => {
  each(
    sliderBreakpoints,
    (breakpoint, callback) => {
      const resizeUploadPath = path.join(image.uploadPath, breakpoint.name);

      image.makeDir(resizeUploadPath);

      console.log(resizeUploadPath);

      sharp(filePath)
        .resize({
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          height: breakpoint.height,
        })
        .toFile(path.join(resizeUploadPath, fileName), callback);
    },
    (err, info) => {
      image.sendMessage(
        res,
        err,
        {
          success: 'Изображение успешно добавлено',
          error: 'Не удалось переместить изображение',
        },
        info,
      );

      image.unlinkImage(res, filePath, 'Не удалось удалить временный файл');
    },
  );
};

router.get('/', (req, res) => {
  crud.getItems(Model, res, { title: 1 });
});

router.post('/', isAuth, (req, res) => {
  image.setUploadPath(sliderDir);

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), image.uploadPath),
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return crud.sendError(err, res, 'insert');
    }

    console.log('fields:', fields);
    console.log('files:', files);

    if (!files.length) {
      crud.createItem(Model, fields, res);
    } else {
      waterfall(
        [
          cb => {
            crud.createItem(Model, fields, res, cb);
          },
          (result, cb) => {
            uploadSlide(res, files.image.path, files.image.name);
            cb(null, result);
          },
        ],
        (err, result) => {
          if (err) {
            return crud.sendError(err, res, 'insert');
          }

          crud.sendResult(result, res, 'insert');
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
