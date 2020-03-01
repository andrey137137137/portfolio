// const jwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const waterfall = require("async/waterfall");
const mongoose = require("mongoose");
const User = mongoose.model("user");

// const getTokenFromHeaders = req => {
//   const {
//     headers: { authorization }
//   } = req;

//   if (authorization && authorization.split(" ")[0] === "Token") {
//     return authorization.split(" ")[1];
//   }

//   return null;
// };

// module.exports.auth = {
//   required: jwt({
//     secret: "secret",
//     userProperty: "payload",
//     getToken: getTokenFromHeaders
//   }),
//   optional: jwt({
//     secret: "secret",
//     userProperty: "payload",
//     getToken: getTokenFromHeaders,
//     credentialsRequired: false
//   })
// };

module.exports.isAuth = (req, res, next) => {
  console.log(req.body);

  if (req.session.token) {
    return next();
  }

  const { username, password } = req.body;
  const signature = "test";
  const expiration = "7h";

  waterfall(
    [
      callback => {
        console.log(username);
        User.findOne({ username }, callback);
      },
      (user, callback) => {
        console.log(user);
        if (!user || !user.validatePassword(password)) {
          console.log(user);
          return res.status(400).send("Имя пользователя или пароль неверны");
        }

        callback(null, user);
      }
    ],
    (err, user) => {
      if (err) {
        next(err);
      }

      req.session.token = jwt.sign({ id: user._id }, signature, {
        expiresIn: expiration
      });
      req.session.save();
      res.send({ token: req.session.token });
    }
  );
};
