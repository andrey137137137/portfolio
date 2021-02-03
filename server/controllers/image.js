const { IncomingForm } = require('formidable');
const path = require('path');
const fs = require('fs');
const { waterfall } = require('async');
const { UPLOAD_PATH } = require('@config').client;
const { ERROR } = require('@httpSt');
const crud = require('@contr/crud');

let uploadPath;

const sendMessage = (res, err, messages, info = false) => {
  if (err) {
    return res.status(ERROR).json({ message: messages.error });
  }

  const data = { message: messages.success };

  if (info) {
    data.info = info;
  }

  res.send(data);
};

const makeDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const setUploadPath = (dir, layer = -1) => {
  makeDir(UPLOAD_PATH);

  uploadPath = dir ? path.join(UPLOAD_PATH, dir) : UPLOAD_PATH;

  if (layer >= 0) {
    uploadPath = path.join(uploadPath, 'layer_' + layer);
  }

  makeDir(uploadPath);
};

const getUploadPath = () => {
  return uploadPath;
};

const getTempPath = (dir, layer = -1) => {
  setUploadPath(dir, layer);
  return path.join(process.cwd(), uploadPath);
};

const upload = (req, res, dir = '', layer = -1) => {
  const form = new IncomingForm();

  form.uploadDir = getTempPath(dir, layer);
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(ERROR).json({
        message: 'Не удалось загрузить изображение',
      });
    }

    const filePath = files.image.path;
    const fileName = files.image.name;

    fs.rename(filePath, path.join(uploadPath, fileName), err => {
      sendMessage(res, err, {
        success: 'Изображение успешно добавлено',
        error: 'Не удалось переместить изображение',
      });
    });
  });
};

const remove = (res, imageName, dir = '') => {
  setUploadPath(dir);

  fs.unlink(path.join(uploadPath, imageName), err => {
    sendMessage(res, err, {
      success: 'Изображение успешно удалено',
      error: 'Не удалось удалить изображение',
    });
  });
};

const waterfallCB = function(err, result, params) {
  const { res, mode } = params;

  if (params.image) {
    params.image = null;
  }

  if (err) {
    return crud.sendError(err, res, mode);
  }

  return crud.sendResult(result, res, mode);
};

const startWaterfall = function(callbackArray, res, mode, image = null) {
  waterfall(callbackArray, (err, result) => {
    if (image) {
      return fs.unlink(image.path, (err, result) => {
        return waterfallCB(err, result, { res, mode, image });
      });
    }

    waterfallCB(err, result, { res, mode, image });
  });
};

module.exports = {
  sendMessage,
  makeDir,
  setUploadPath,
  getUploadPath,
  getTempPath,
  upload,
  remove,
  startWaterfall,
};
