// const jwt = require("express-jwt");
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
  console.log(req.session);
  if (req.session.user) {
    return next();
  }

  const { username, password } = req.body;

  if (username && password) {
    User.findOne({ username })
      .then(user => {
        if (!user || !user.validatePassword(password)) {
          res.status(500).json({
            status: "Не совпадает имя или пароль!"
          });
        }

        // req.session.authorized = true;
        req.session.user = user._id;
        req.session.save();

        console.log(req.session);
        res.status(200).json({
          profile: user.profile
        });
      })
      .catch(err => {
        res.status(500).json({
          status: "При авторизации произошла ошибка: " + err
        });
      });
  } else {
    res.status(400).send({ success: false, message: "Session Expired" });
  }
};
