const jwt = require("jsonwebtoken");
const waterfall = require("async/waterfall");
const router = require("express").Router();
const Model = require("mongoose").model("user");

const {
  SIGNATURE
  // EXPIRATION
} = require("@config").session;
const { isAuth } = require("../auth");
const crud = require("../../controllers/crud");

router.get("/", isAuth, (req, res) => {
  crud.getItems(Model, res);
}); // READ

router.post("/", isAuth, (req, res) => {
  crud.createItem(
    Model,
    {
      profile: req.body.profile,
      username: req.body.username
    },
    res
  );
}); // CREATE

router.put("/:id", isAuth, (req, res) => {
  crud.updateItem(
    Model,
    req.params.id,
    {
      profile: req.body.profile,
      username: req.body.username
    },
    res
  );
}); // UPDATE

router.delete("/:id", isAuth, (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
}); // DELETE

router.get("/reg", (req, res) => {
  const User = new Model({
    profile: {
      firstName: "Андрей",
      lastName: "Банников",
      contacts: []
    },
    username: "andrey21",
    password: ""
  });

  return User.save().then(() => res.json({ user: User }));
});

router.get("/auth", isAuth, (req, res) => {
  res.send({ token: req.session.token });
});

router.post("/auth", (req, res, next) => {
  const { username, password } = req.body;

  waterfall(
    [
      cb => {
        console.log(username);
        Model.findOne({ username }, cb);
      },
      (user, cb) => {
        console.log(user);
        if (
          !user
          // || !user.validatePassword(password)
        ) {
          console.log(user);
          return res.status(400).send("Имя пользователя или пароль неверны");
        }

        user.validatePassword(password);

        cb(null, user);
      }
    ],
    (err, user) => {
      if (err) next(err);

      req.session.token = jwt.sign(
        { id: user._id },
        SIGNATURE
        // { expiresIn: EXPIRATION }
      );
      res.send({ token: req.session.token });
    }
  );
});

module.exports = router;
