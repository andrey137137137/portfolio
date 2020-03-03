// const passport = require("passport");
const jwt = require("jsonwebtoken");
const waterfall = require("async/waterfall");
const router = require("express").Router();
const Model = require("mongoose").model("user");

const { isAuth } = require("../auth");
const crud = require("../../controllers/crud");

// router.get("/", (req, res) => {
//   const User = new Model({
//     profile: {
//       firstName: "Андрей",
//       lastName: "Банников",
//       contacts: []
//     },
//     username: "andrey21",
//     password: ""
//   });

//   return User.save().then(() => res.json({ user: User }));
// });

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

router.get("/test", (req, res) => {
  console.log(req.session);
  res.send("hello world");
});

router.get("/auth", isAuth, (req, res) => {
  res.send({ token: req.session.token });
});

//POST login route (optional, everyone has access)
router.post("/auth", (req, res, next) => {
  const { username, password } = req.body;
  const signature = "test";
  // const expiration = "7h";

  waterfall(
    [
      callback => {
        console.log(username);
        Model.findOne({ username }, callback);
      },
      (user, callback) => {
        console.log(user);
        if (
          !user
          // || !user.validatePassword(password)
        ) {
          console.log(user);
          return res.status(400).send("Имя пользователя или пароль неверны");
        }

        user.validatePassword(password, function(err, isMatch) {
          if (err) throw err;

          console.log(password + ":", isMatch);

          if (!isMatch) {
            return res.status(400).send("Имя пользователя или пароль неверны");
          }

          callback(null, user);
        });
      }
    ],
    (err, user) => {
      if (err) next(err);

      req.session.token = jwt.sign(
        { id: user._id },
        signature
        // { expiresIn: expiration }
      );
      res.send({ token: req.session.token });
    }
  );
});

//GET current route (required, only authenticated users have access)
router.get("/current", isAuth, (req, res, next) => {
  const {
    payload: { id }
  } = req;

  return Model.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user });
  });
});

module.exports = router;
