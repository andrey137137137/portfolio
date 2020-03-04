module.exports.getItems = function(Model, res) {
  Model.find()
    .then(items => {
      res.status(200).json({ items });
    })
    .catch(err => {
      res.status(500).json({
        status: "При чтении записей произошла ошибка: " + err
      });
    });
};

module.exports.createItem = function(Model, data, res) {
  // создаем новую запись блога и передаем в нее поля из формы
  const item = new Model(data);
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

module.exports.updateItem = function(Model, id, data, res) {
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

module.exports.deleteItem = function(Model, id, res) {
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
