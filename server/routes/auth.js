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

module.exports.isAuth = function(req, res, next) {
  console.log(req.session);

  if (req.isAuthenticated()) {
    return next();
  }

  const { username, password } = req.body;

  if (username && password) {
    User.findOne({ username: username })
      .then(function(user) {
        if (!user || !user.validatePassword(password)) {
          res.status(500).json({
            status: "При чтении записей произошла ошибка: "
          });
        }

        req.session.authorized = true;
        req.session.username = username;

        console.log(req.session);
        res.status(200);
      })
      .catch(function(err) {
        res.status(500).json({
          status: "При чтении записей произошла ошибка: " + err
        });
      });
  }

  res.status(400).send({ success: false, message: "Session Expired" });
};
