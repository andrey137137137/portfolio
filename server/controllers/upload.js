const { ERROR } = require('@httpSt');
const { IncomingForm } = require('formidable');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// function getExt(name) {
//   return name.slice(name.lastIndexOf(".") + 1);
// }

function sendMessage(res, err, info = false) {
  if (err) {
    return res.status(ERROR).json({
      message: 'Не удалось переместить изображение',
    });
  }

  res.send({
    message: 'Изображение успешно добавлено',
  });
}

function resizeImage(image, name, sizes, res) {
  const params = { background: { r: 0, g: 0, b: 0, alpha: 0 } };

  if (sizes.width) params.width = sizes.width;
  if (sizes.height) params.height = sizes.height;

  sharp(image)
    .resize(params)
    .toFile(name, (err, info) => {
      sendMessage(res, err, info);
    });
}

module.exports = function(req, res, dir = '', layer = -1) {
  const form = new IncomingForm();
  const rootPath = 'public/upload';
  let uploadPath = dir ? path.join(rootPath, dir) : rootPath;
  let fileName;
  let filePath;

  if (layer >= 0) {
    uploadPath = path.join(uploadPath, 'layer_' + layer);
  }

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  form.uploadDir = path.join(process.cwd(), uploadPath);

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(ERROR).json({
        message: 'Не удалось загрузить изображение',
      });
    }

    fileName = files.image.name;
    filePath = path.join(uploadPath, fileName);

    if (dir == 'slider') {
      resizeImage(files.image.path, fileName, { height: 569 }, res);
      resizeImage(files.image.path, fileName, { height: 525 }, res);
      resizeImage(files.image.path, fileName, { height: 529 }, res);
      resizeImage(files.image.path, fileName, { height: 257 }, res);
    } else {
      fs.rename(files.image.path, filePath, err => {
        sendMessage(res, err);
      });
    }
  });
};
