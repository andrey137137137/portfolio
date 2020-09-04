const { ERROR } = require('@httpSt');
const { IncomingForm } = require('formidable');
const fs = require('fs');
const path = require('path');

// function getExt(name) {
//   return name.slice(name.lastIndexOf(".") + 1);
// }

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

    fs.rename(files.image.path, filePath, err => {
      if (err) {
        // fs.unlink(filePath);
        // fs.rename(files.image.path, filePath);
        return res.status(ERROR).json({
          message: 'Не удалось переместить изображение',
        });
      }

      res.send({
        message: 'Изображение успешно добавлено',
      });
    });
  });
};
