const mongoose = require("mongoose");
const Model = mongoose.model("skill");

module.exports.getSkills = function(req, res) {
  Model.find()
    .then(items => {
      res.status(200).json({ skills: items });
    })
    .catch(err => {
      res.status(500).json({
        status: "При чтении записей произошла ошибка: " + err
      });
    });
};

module.exports.createSkill = function(req, res) {
  // создаем новую запись блога и передаем в нее поля из формы
  let item = new Model({
    category: req.body.category,
    items: req.body.items
  });
  // сохраняем запись в базе
  item
    .save()
    .then(item => {
      return res.status(200).json({ status: "Запись успешно добавлена" });
    })
    .catch(err => {
      // обрабатываем  и отправляем
      res.status(500).json({
        status: "При добавление записи произошла ошибка: " + err
      });
    });
};

module.exports.updateSkill = function(req, res) {
  const id = req.params.id;

  let data = {
    category: req.body.category,
    items: req.body.items
  };

  const Model = mongoose.model("skill");

  Model.findByIdAndUpdate(id, { $set: data })
    .then(item => {
      if (item) {
        res.status(200).json({ status: "Запись успешно обновлена" });
      } else {
        res.status(404).json({ status: "Запись в БД не обнаружена" });
      }
    })
    .catch(err => {
      res.status(404).json({
        status: "При обновлении записи произошла ошибка: " + err
      });
    });
};

module.exports.deleteSkill = function(req, res) {
  const id = req.params.id;
  const Model = mongoose.model("skill");

  Model.findByIdAndRemove(id).then(
    item => {
      if (item) {
        res.status(200).json({ status: "Запись успешно удалена" });
      } else {
        res.status(404).json({ status: "Запись в БД не обнаружена" });
      }
    },
    err => {
      res.status(500).json({
        status: "При удалении записи произошла ошибка: " + err
      });
    }
  );
};
