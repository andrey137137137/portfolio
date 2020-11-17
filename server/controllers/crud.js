const { SUCCESS, FORBIDDEN, NOT_FOUND, ERROR } = require('@httpSt');
const waterfall = require('async/waterfall');

function getMessage(mode, isError = false) {
  switch (mode) {
    case 'find':
      return 'чтении записей';
    case 'findOne':
      return 'чтении записи';
    case 'insert':
      if (isError) return 'добавлении записи';
      return 'добавлена';
    case 'update':
      if (isError) return 'обновлении записи';
      return 'обновлена';
    case 'delete':
      if (isError) return 'удалении записи';
      return 'удалена';
  }
}

function get(Model, res, filter, fields, options, mode = 'many') {
  const types = {
    many: 'find',
    one: 'findOne',
    id: 'findById',
  };
  const method = types[mode];

  Model[method](filter, fields, options)
    .then(result => {
      res.status(SUCCESS).json({ result });
    })
    .catch(err => {
      module.exports.sendError(err, res, mode == 'many' ? 'find' : 'findOne');
    });
}

function update(Model, query, data, res, isNotCB = false) {
  const method = query.id ? 'findByIdAndUpdate' : 'findOneAndUpdate';
  const filter = query.id ? query.id : query;
  const func = Model[method](filter, { $set: data });

  if (isNotCB) return func;

  func
    .then(result => {
      module.exports.sendResult(result, res, 'update');
    })
    .catch(err => {
      module.exports.sendError(err, res, 'update');
    });
}

module.exports.sendResult = (result, res, mode = 'insert') => {
  if (!result) {
    let message = 'Запись в БД не обнаружена';

    if (mode == 'insert') {
      message = 'Невозможно добавить новую запись в БД';
    }

    return res.status(NOT_FOUND).json({ message });
  }

  const data = { message: 'Запись успешно ' + getMessage(mode) };

  if (mode == 'insert') {
    data._id = result._id;
  }

  res.status(SUCCESS).json(data);
};

module.exports.sendError = (err, res, mode) => {
  res.status(ERROR).json({
    message: `При ${getMessage(mode, true)} произошла ошибка: ${err}`,
  });
};

module.exports.getItemById = (Model, res, id, fields = {}, options = {}) => {
  get(Model, res, id, fields, options, 'id');
};

module.exports.getItem = (
  Model,
  res,
  filter = {},
  fields = {},
  options = {},
) => {
  get(Model, res, filter, fields, options, 'one');
};

module.exports.getItems = (Model, res, sort, filter = {}, fields = {}) => {
  get(Model, res, filter, fields, { sort });
};

module.exports.createItem = (Model, data, res, cb = false) => {
  const item = new Model(data);

  if (cb !== false) return item.save(cb);

  item
    .save()
    .then(result => {
      module.exports.sendResult(result, res, 'insert');
    })
    .catch(err => {
      module.exports.sendError(err, res, 'insert');
    });
};

module.exports.updateItem = (Model, id, data, res, isNotCB = false) => {
  update(Model, { id }, data, res, isNotCB);
};

module.exports.updateItemByQuery = (
  Model,
  query,
  data,
  res,
  isNotCB = false,
) => {
  update(Model, query, data, res, isNotCB);
};

module.exports.updateUserPassword = (Model, id, data, res) => {
  const { email, username, oldPassword, password, repPassword } = data;

  waterfall(
    [
      cb => {
        Model.findById(id, cb);
      },
      (user, cb) => {
        if (!user.validatePassword(oldPassword)) {
          return res
            .status(FORBIDDEN)
            .json({ message: 'Старый пароль неверный' });
        }

        if (!password || password !== repPassword) {
          return res
            .status(FORBIDDEN)
            .json({ message: 'Повтор пароля неверный' });
        }

        user.email = email;
        user.username = username;
        user.password = password;

        user.save(cb);
      },
    ],
    (err, user) => {
      if (err) {
        module.exports.sendError(err, res, 'update');
      }

      module.exports.sendResult(user, res, 'update');
    },
  );
};

module.exports.deleteItem = (Model, id, res) => {
  Model.findByIdAndRemove(id).then(
    result => {
      module.exports.sendResult(result, res, 'delete');
    },
    err => {
      module.exports.sendError(err, res, 'delete');
    },
  );
};
