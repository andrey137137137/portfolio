// const jwt = require("express-jwt");

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

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(400).send({ success: false, message: "Session Expired" });
};
