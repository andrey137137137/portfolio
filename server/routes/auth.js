// const jwt = require("express-jwt");
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

  if (req.session.user) {
    return next();
  }

  const { username, password } = req.body;

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

      req.session.user = user._id;
      req.session.save();
      res.send(user);
    }
  );
};
