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

let globalFields;
let globalFiles;

function uploadSlide(res, filePath, fileName) {
  each(
    sliderBreakpoints,
    (breakpoint, callback) => {
      const resizeUploadPath = path.join(
        image.getUploadPath(),
        breakpoint.name,
      );

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
      // image.sendMessage(
      //   res,
      //   err,
      //   {
      //     success: 'Изображение успешно добавлено',
      //     error: 'Не удалось переместить изображение',
      //   },
      //   info,
      // );

      image.unlinkImage(res, filePath, 'Не удалось удалить временный файл');
    },
  );
}

function deleteSlide(res, imageName, highCB) {
  image.setUploadPath(sliderDir);

  console.log('uploadPath: ' + image.getUploadPath());

  each(
    sliderBreakpoints,
    (breakpoint, cb) => {
      const deleteUploadPath = path.join(
        image.getUploadPath(),
        breakpoint.name,
      );

      console.log(deleteUploadPath);

      fs.unlink(path.join(deleteUploadPath, imageName), cb);
    },
    (err, info) => {
      // image.sendMessage(res, err, deleteImageMessages, info);

      // if (err) {
      highCB(err, info);
      // }
    },
  );
}

function callbackMessage(err, result, res, mode) {
  if (err) {
    return crud.sendError(err, res, mode);
  }

  crud.sendResult(result, res, mode);
}

function formParse(req, res, mode, withoutSlideCB, withSlideArrayCallbacks) {
  // const { title, link, image, techs } = req.body;

  const form = new IncomingForm({
    uploadDir: image.getTempPath(sliderDir),
  });

  console.log('uploadPath: ' + image.getUploadPath());

  form.parse(req, (err, fields, files) => {
    if (err) {
      return crud.sendError(err, res, mode);
    }

    // console.log('fields:', fields);
    // console.log('files:', files);

    globalFields = fields;
    globalFiles = files;

    if (!globalFiles.image) {
      withoutSlideCB();
    } else {
      waterfall(withSlideArrayCallbacks, (err, result) => {
        callbackMessage(err, result, res, mode);
      });
    }
  });
}

router.get('/', (req, res) => {
  crud.getItems(Model, res, { title: 1 });
});

router.post('/', isAuth, (req, res) => {
  formParse(
    req,
    res,
    'insert',
    () => {
      crud.createItem(Model, globalFields, res);
    },
    [
      cb => {
        crud.createItem(Model, globalFields, res, cb);
      },
      (result, cb) => {
        uploadSlide(res, globalFiles.image.path, globalFiles.image.name);
        cb(null, result);
      },
    ],
  );
});

router.put('/:id', isAuth, (req, res) => {
  const { id } = req.params;

  formParse(
    req,
    res,
    'update',
    () => {
      crud.updateItem(Model, id, globalFields, res);
    },
    [
      cb => {
        crud.getItemById(Model, res, id, {}, {}, cb);
      },
      (result, cb) => {
        if (result.imageName) {
          deleteSlide(res, `${id}_${result.imageName}`, cb);
        } else {
          cb(null, result);
        }
      },
      (result, cb) => {
        crud.updateItem(Model, id, globalFields, res, cb);
      },
      (result, cb) => {
        uploadSlide(res, globalFiles.image.path, globalFiles.image.name);
        cb(null, result);
      },
    ],
  );
});

router.delete('/:id', isAuth, (req, res) => {
  const { id } = req.params;

  waterfall(
    [
      cb => {
        crud.getItemById(Model, res, id, {}, {}, cb);
      },
      (result, cb) => {
        if (result.imageName) {
          deleteSlide(res, `${id}_${result.imageName}`, cb);
        } else {
          cb(null, result);
        }
      },
      (result, cb) => {
        crud.deleteItem(Model, id, res, cb);
      },
    ],
    (err, result) => {
      callbackMessage(err, result, res, 'delete');
    },
  );
});

module.exports = router;
