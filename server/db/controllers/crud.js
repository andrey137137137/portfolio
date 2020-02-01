const mongoose = require("mongoose");
let Model;

function setModel(model) {
  Model = mongoose.model(model);
}

function getItems(model, res) {
  setModel(model);
  Model.find()
    .then(items => {
      res.status(200).json({ items });
    })
    .catch(err => {
      res.status(500).json({
        status: "При чтении записей произошла ошибка: " + err
      });
    });
}

function createItem(model, data, res) {
  setModel(model);
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
}

function updateItem(model, id, data, res) {
  setModel(model);
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
}

function deleteItem(model, id, res) {
  setModel(model);
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
}

module.exports.getPosts = function(req, res) {
  getItems("post", res);
};

module.exports.createPost = function(req, res) {
  createItem(
    "post",
    {
      title: req.body.title,
      date: new Date(),
      body: req.body.text
    },
    res
  );
};

module.exports.updatePost = function(req, res) {
  updateItem(
    "post",
    req.params.id,
    {
      title: req.body.title,
      date: new Date(req.body.date),
      body: req.body.text
    },
    res
  );
};

module.exports.deletePost = function(req, res) {
  deleteItem("post", req.params.id, res);
};

module.exports.getSkills = function(req, res) {
  getItems("skill", res);
};

module.exports.createSkill = function(req, res) {
  createItem(
    "skill",
    {
      category: req.body.category,
      items: req.body.items
    },
    res
  );
};

module.exports.updateSkill = function(req, res) {
  updateItem(
    "skill",
    req.params.id,
    {
      category: req.body.category,
      items: req.body.items
    },
    res
  );
};

module.exports.deleteSkill = function(req, res) {
  deleteItem("skill", req.params.id, res);
};

module.exports.getSlides = function(req, res) {
  getItems("slide", res);
};

module.exports.createSlide = function(req, res) {
  createItem(
    "slide",
    {
      title: req.body.title,
      link: req.body.link,
      image: req.body.image,
      techs: req.body.techs
    },
    res
  );
};

module.exports.updateSlide = function(req, res) {
  updateItem(
    "slide",
    req.params.id,
    {
      title: req.body.title,
      link: req.body.link,
      image: req.body.image,
      techs: req.body.techs
    },
    res
  );
};

module.exports.deleteSlide = function(req, res) {
  deleteItem("slide", req.params.id, res);
};

module.exports.getUser = function(req, res) {
  getItems("user", res);
};

module.exports.createUser = function(req, res) {
  createItem(
    "user",
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      avatar: req.body.avatar,
      contacts: req.body.contacts
    },
    res
  );
};

module.exports.updateUser = function(req, res) {
  updateItem(
    "user",
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      avatar: req.body.avatar,
      contacts: req.body.contacts
    },
    res
  );
};

module.exports.deleteUser = function(req, res) {
  deleteItem("user", req.params.id, res);
};
