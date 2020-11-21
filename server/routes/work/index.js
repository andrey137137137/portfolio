const path = require('path');
const router = require('express').Router();
const Model = require('mongoose').model('work');
const { IncomingForm } = require('formidable');
const { waterfall, each } = require('async');
const sharp = require('sharp');
const fs = require('fs');

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
const deleteImageMessages = {
  success: 'Изображение успешно удалено',
  error: 'Не удалось удалить изображение',
};

const callbackMessage = (err, result, res, mode) => {
  if (err) {
    return crud.sendError(err, res, mode);
  }

  crud.sendResult(result, res, mode);
};

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

const deleteSlide = (res, imageName, highCB) => {
  image.setUploadPath(sliderDir);

  each(
    sliderBreakpoints,
    (breakpoint, cb) => {
      const deleteUploadPath = path.join(image.uploadPath, breakpoint.name);

      console.log(deleteUploadPath);

      fs.unlink(path.join(deleteUploadPath, imageName), cb);
    },
    (err, info) => {
      image.sendMessage(res, err, deleteImageMessages, info);

      if (err) {
        return highCB(err, null);
      }
    },
  );
};

router.get('/', (req, res) => {
  crud.getItems(Model, res, { title: 1 });
});

router.post('/', isAuth, (req, res) => {
  // const { title, link, image, techs } = req.body;

  const form = new IncomingForm({
    uploadDir: image.getUploadDir(sliderDir),
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
          callbackMessage(err, result, res, 'insert');
        },
      );
    }
  });
});

router.put('/:id', isAuth, (req, res) => {
  // const { title, link, image, techs } = req.body;

  const form = new IncomingForm({
    uploadDir: image.getUploadDir(sliderDir),
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return crud.sendError(err, res, 'insert');
    }

    console.log('fields:', fields);
    console.log('files:', files);

    if (!files.length) {
      crud.updateItem(Model, req.params.id, fields, res);
    } else {
      waterfall(
        [
          cb => {
            crud.getItemById(Model, res, req.params.id, {}, {}, cb);
          },
          (result, cb) => {
            if (result.imageName) {
              deleteSlide(res, `${req.params.id}_${result.imageName}`, cb);
            } else {
              cb(null, result);
            }
          },
          (result, cb) => {
            crud.updateItem(Model, req.params.id, fields, res, cb);
          },
          (result, cb) => {
            uploadSlide(res, files.image.path, files.image.name);
            cb(null, result);
          },
        ],
        (err, result) => {
          callbackMessage(err, result, res, 'update');
        },
      );
    }
  });
});

router.delete('/:id', isAuth, (req, res) => {
  waterfall(
    [
      cb => {
        crud.getItemById(Model, res, req.params.id, {}, {}, cb);
      },
      (result, cb) => {
        if (result.imageName) {
          deleteSlide(res, `${req.params.id}_${result.imageName}`, cb);
        } else {
          cb(null, result);
        }
      },
      (result, cb) => {
        crud.deleteItem(Model, req.params.id, res, cb);
      },
    ],
    (err, result) => {
      callbackMessage(err, result, res, 'delete');
    },
  );
});

module.exports = router;
