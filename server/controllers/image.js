const { ERROR } = require('@httpSt');
const { IncomingForm } = require('formidable');
const path = require('path');
const fs = require('fs');

const rootPath = path.join('public', 'upload');

let uploadPath;

const sendMessage = (res, err, messages, info = false) => {
  if (err) {
    return res.status(ERROR).json({ message: messages.error });
  }

  const data = { message: messages.success };

  if (info) data.info = info;

  res.send(data);
};

const makeDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const setUploadPath = (dir, layer = -1) => {
  uploadPath = dir ? path.join(rootPath, dir) : rootPath;

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

const unlinkImage = (res, path, msgError, msgSuccess = false) => {
  fs.unlink(path, err => {
    if (err) {
      res.status(ERROR).json({ message: msgError });
    }

    if (msgSuccess) {
      res.send({ message: msgSuccess });
    }
  });
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
      sendMessage(res, err);
    });
  });
};

const remove = (res, imageName, dir = '') => {
  const messages = {
    success: 'Изображение успешно удалено',
    error: 'Не удалось удалить изображение',
  };

  setUploadPath(dir);

  unlinkImage(
    res,
    path.join(uploadPath, imageName),
    messages.error,
    messages.success,
  );
};

module.exports = {
  sendMessage,
  makeDir,
  setUploadPath,
  getUploadPath,
  getTempPath,
  upload,
  remove,
};
