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
  if (req.session.token) {
    return next();
  }
};
