const jwt = require("jsonwebtoken");
const waterfall = require("async/waterfall");
const router = require("express").Router();
const Model = require("mongoose").model("user");

const {
  SIGNATURE
  // EXPIRATION
} = require("@config").jwt;
const isAuth = require("@auth");

router.get("/auth", isAuth, (req, res) => {
  res.send({ success: true });
});

router.post("/auth", (req, res, next) => {
  const { username, password } = req.body;

  waterfall(
    [
      cb => {
        console.log(username, password);
        Model.findOne({ username }, cb);
      },
      (user, cb) => {
        console.log(user);
        if (!user || !user.validatePassword(password)) {
          console.log(user);
          return res.status(400).send("Имя пользователя или пароль неверны");
        }

        console.log(user.validatePassword(password));
        cb(null, user);
      }
    ],
    (err, user) => {
      if (err) next(err);

      req.session.token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username
        },
        SIGNATURE
        // { expiresIn: EXPIRATION }
      );
      res.send({ success: true });
    }
  );
});

router.delete("/auth", isAuth, (req, res) => {
  const { token } = req.session;

  if (!token) {
    return res.send({ status: false });
  }

  req.session.destroy(() => {
    res.send({ status: true });
  });
});

module.exports = router;
