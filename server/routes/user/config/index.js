const waterfall = require("async/waterfall");
const router = require("express").Router();
const Model = require("mongoose").model("user");

const { isAuth, userId } = require("@auth");
const crud = require("@contr/crud");

router.get("/", isAuth, (req, res, next) => {
  crud.getItemById(Model, res, userId(req.session.token, next), {
    _id: 0,
    email: 1,
    username: 1
  });
});

router.post("/", isAuth, (req, res, next) => {
  const { email, username, oldPassword, password, repPassword } = req.body;

  if (!oldPassword && !password) {
    return crud.updateItem(
      Model,
      userId(req.session.token, next),
      {
        email,
        username,
        oldPassword,
        password,
        repPassword
      },
      res
    );
  }

  waterfall(
    [
      cb => {
        Model.findById(userId(req.session.token, next), cb);
      },
      (user, cb) => {
        if (!user.validatePassword(oldPassword)) {
          return res.status(400).send("Старый пароль неверный");
        }

        if (!password || password !== repPassword) {
          return res.status(400).send("Повтор пароля неверный");
        }

        cb(null, user);
      }
    ],
    (err, user) => {
      if (err) {
        err => {
          return res.status(500).json({
            status: "При обновлении записи произошла ошибка: " + err
          });
        };
      }

      res.send({ status: "Запись успешно обновлена" });
    }
  );
});

module.exports = router;
