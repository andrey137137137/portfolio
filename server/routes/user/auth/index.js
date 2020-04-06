const waterfall = require("async/waterfall");
const router = require("express").Router();
const Model = require("mongoose").model("user");

const { isAuth, setToken } = require("@auth");

router.get("/", isAuth, (req, res) => {
  res.send({ success: true });
});

router.post("/", (req, res, next) => {
  if (req.session.token) return res.send({ success: true });

  const { username, password } = req.body;

  waterfall(
    [
      (cb) => {
        Model.findOne({ username }, cb);
      },
      (user, cb) => {
        if (!user || !user.validatePassword(password)) {
          return res.status(400).send("Имя пользователя или пароль неверны");
        }

        cb(null, user);
      },
    ],
    (err, user) => {
      if (err) next(err);

      req.session.token = setToken(user._id, next);
      res.send({ success: true });
    }
  );
});

router.delete("/", isAuth, (req, res) => {
  const { token } = req.session;

  if (!token) {
    return res.send({ success: true });
  }

  req.session.destroy(() => {
    res.send({ success: true });
  });
});

module.exports = router;
