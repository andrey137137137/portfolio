const { ERROR } = require('@httpSt');
const { IncomingForm } = require('formidable');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

let uploadPath;
let resizeUploadPath;
let filePath;
let fileName;

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

function resizeImage(breakpoint, res) {
  console.log(resizeUploadPath);

  sharp(filePath)
    .resize({
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      height: breakpoint.height,
    })
    .toFile(path.join(resizeUploadPath, fileName), (err, info) => {
      // sendMessage(res, err, info);
    });
}

module.exports = function(req, res, dir = '', layer = -1) {
  const form = new IncomingForm();
  const rootPath = 'public/upload';

  uploadPath = dir ? path.join(rootPath, dir) : rootPath;

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

    filePath = files.image.path;
    fileName = files.image.name;

    if (dir == 'slider') {
      const breakpoints = [
        { name: 'xl', height: 525 },
        { name: 'lg', height: 257 },
        { name: 'md', height: 215 },
        { name: 'sm', height: 93 },
      ];

      breakpoints.map(item => {
        resizeUploadPath = path.join(uploadPath, item.name);

        if (!fs.existsSync(resizeUploadPath)) {
          fs.mkdirSync(resizeUploadPath);
        }

        resizeImage(item, res);
      });
    } else {
      fs.rename(filePath, path.join(uploadPath, fileName), err => {
        sendMessage(res, err);
      });
    }
  });
};
