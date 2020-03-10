function get(Model, res, filter, fields, mode = "many") {
  const types = {
    many: "find",
    one: "findOne",
    id: "findById"
  };
  const FUNC = types[mode];

  Model[FUNC](filter, fields)
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      const errStr =
        mode == "many"
          ? "При чтении записей произошла ошибка"
          : "При чтении записи произошла ошибка";

      res.status(500).json({
        status: errStr + ": " + err
      });
    });
}

function update(Model, query, data, res) {
  const FUNC = query.id ? "findByIdAndUpdate" : "findOneAndUpdate";
  const filter = query.id ? query.id : query;

  Model[FUNC](filter, { $set: data })
    .then(result => {
      if (result) {
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
}

module.exports.getItemById = (Model, res, id, fields = {}) => {
  get(Model, res, id, fields, "id");
};

module.exports.getItem = (Model, res, filter = {}, fields = {}) => {
  get(Model, res, filter, fields, "one");
};

module.exports.getItems = (Model, res, filter = {}, fields = {}) => {
  get(Model, res, filter, fields);
};

module.exports.createItem = (Model, data, res) => {
  const item = new Model(data);

  item
    .save()
    .then(result => {
      return res.status(200).json({ status: "Запись успешно добавлена" });
    })
    .catch(err => {
      res.status(500).json({
        status: "При добавление записи произошла ошибка: " + err
      });
    });
};

module.exports.updateItem = (Model, id, data, res) => {
  update(Model, { id }, data, res);
};

module.exports.updateItemByQuery = (Model, query, data, res) => {
  update(Model, query, data, res);
};

module.exports.deleteItem = (Model, id, res) => {
  Model.findByIdAndRemove(id).then(
    result => {
      if (result) {
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
