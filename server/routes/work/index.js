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

let curRes;
let curID;
let curMode;
let curFields;
let uplImage;

function getImageNameWithID(imageName) {
  return `${curID}_${imageName}`;
}

function uploadSlide(data, highCB) {
  if (!uplImage) {
    return highCB(null, data);
  }

  curID = data._id;

  each(
    sliderBreakpoints,
    (breakpoint, cb) => {
      const resizeUploadPath = path.join(
        image.getUploadPath(),
        breakpoint.name,
      );

      image.makeDir(resizeUploadPath);

      sharp(uplImage.path)
        .resize({
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          height: breakpoint.height,
        })
        .toFile(
          path.join(resizeUploadPath, getImageNameWithID(uplImage.name)),
          cb,
        );
    },
    (err, info) => {
      // if (err) {
      //   return image.sendMessage(curRes, err, {
      //     success: 'Изображение успешно добавлено',
      //     error: 'Не удалось переместить изображение',
      //   });
      // }

      highCB(err, info);
    },
  );
}

function deleteSlide(data, highCB) {
  if (!data.imageName) {
    return highCB(null, data);
  }

  image.setUploadPath(sliderDir);

  each(
    sliderBreakpoints,
    (breakpoint, cb) => {
      const deleteUploadPath = path.join(
        image.getUploadPath(),
        breakpoint.name,
      );

      fs.unlink(
        path.join(deleteUploadPath, getImageNameWithID(data.imageName)),
        cb,
      );
    },
    (err, info) => {
      // if (err) {
      //   return image.sendMessage(curRes, err, {
      //     success: 'Изображение успешно удалено',
      //     error: 'Не удалось удалить изображение',
      //   });
      // }

      highCB(err, info);
    },
  );
}

function waterfallCB(err, result) {
  if (uplImage) {
    uplImage = false;
  }

  if (err) {
    return crud.sendError(err, curRes, curMode);
  }

  return crud.sendResult(result, curRes, curMode);
}

function startWaterfall(callbackArray) {
  waterfall(callbackArray, (err, result) => {
    // console.log('uplImage:');
    // console.log(uplImage);

    if (uplImage) {
      return image.unlinkImage(uplImage.path, waterfallCB);
    }

    waterfallCB(err, result);
  });
}

function formParse(req, res, mode, withoutSlideCB, withSlideCallbacksArray) {
  curRes = res;
  curMode = mode;

  const form = new IncomingForm({
    uploadDir: image.getTempPath(sliderDir),
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return crud.sendError(err, curRes, curMode);
    }

    // console.log('fields:', fields);
    // console.log('files:', files);

    const { title, link, imageName, techs } = fields;
    const condition = mode == 'update' ? !imageName : false;

    curFields = { title, link, imageName };

    if (techs) {
      curFields.techs = JSON.parse(techs);
    }

    uplImage = files.image;

    if (uplImage || condition) {
      startWaterfall(withSlideCallbacksArray);
    } else {
      withoutSlideCB();
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
      crud.createItem(Model, curFields, res);
    },
    [
      cb => {
        crud.createItem(Model, curFields, res, cb);
      },
      (result, cb) => {
        uploadSlide(result, cb);
      },
    ],
  );
});

router.put('/:id', isAuth, (req, res) => {
  curID = req.params.id;

  formParse(
    req,
    res,
    'update',
    () => {
      crud.updateItem(Model, curID, curFields, res);
    },
    [
      cb => {
        crud.getItemById(Model, res, curID, {}, {}, cb);
      },
      (result, cb) => {
        deleteSlide(result, cb);
      },
      (result, cb) => {
        crud.updateItem(Model, curID, curFields, res, cb);
      },
      (result, cb) => {
        uploadSlide(result, cb);
      },
    ],
  );
});

router.delete('/:id', isAuth, (req, res) => {
  curID = req.params.id;
  curRes = res;
  curMode = 'delete';

  startWaterfall([
    cb => {
      crud.getItemById(Model, res, curID, {}, {}, cb);
    },
    (result, cb) => {
      deleteSlide(result, cb);
    },
    (result, cb) => {
      crud.deleteItem(Model, curID, res, cb);
    },
  ]);
});

module.exports = router;
