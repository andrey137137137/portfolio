const { ERROR } = require('@httpSt');
const { IncomingForm } = require('formidable');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// function getExt(name) {
//   return name.slice(name.lastIndexOf(".") + 1);
// }

function saveSlideImages(input, name, path) {
  const source = sharp(input);
  const background = { r: 0, g: 0, b: 0, alpha: 0 };

  source
    .resize(320, 240, { background })
    .toFile(name + '.png', (err, info) => {});
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
