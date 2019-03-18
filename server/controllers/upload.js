const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
// const http = require("request");

function getExt(name) {
  const start = name.lastIndexOf(".");
  return name.slice(start + 1);
}

function upload(req, res, dir = "") {
  const form = new formidable.IncomingForm();
  const rootPath = "public/upload";
  const uploadPath = dir ? rootPath : `${rootPath}/${dir}`;
  let fileName;
  let filePath;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  form.uploadDir = path.join(process.cwd(), uploadPath);

  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.json({
        msg: "Не удалось загрузить картинку",
        status: "Error"
      });
    }

    console.log(files);
    fileName = !dir ? `avatar.${getExt(files.image.name)}` : files.image.name;
    filePath = path.join(uploadPath, fileName);

    fs.rename(files.image.path, filePath, function(err) {
      if (err) {
        console.log(err);
        fs.unlink(filePath);
        fs.rename(files.image.path, filePath);
      }

      // const pathApi = "/api/avatar";
      // let dir = filePath.substr(filePath.indexOf("\\"));
      // const requestOptions = {
      //   url: apiOptions.server + pathApi,
      //   method: "POST",
      //   json: {
      //     name: fields.name,
      //     picture: dir
      //   }
      // };

      // http(requestOptions, function(error, response, body) {
      //   if (error) {
      //     return res.json({
      //       msg: "Картинка не сохранилась в БД " + error,
      //       status: "Error"
      //     });
      //   }
      //   res.json({ msg: "Картинка успешно загружена", status: "Ok" });
      // });
    });
  });
}

module.exports.avatar = function(req, res) {
  upload(req, res);
};

module.exports.slider = function(req, res) {
  upload(req, res, "slider");
};

module.exports.comments = function(req, res) {
  upload(req, res, "comments");
};
