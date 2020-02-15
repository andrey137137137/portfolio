const express = require("express");
// const path = require("path");
const bodyParser = require("body-parser");
// const session = require("express-session");
// const cors = require("cors");
const axios = require("axios");
const passport = require("passport");
const errorHandler = require("errorhandler");
const config = require("../api/config");

require("./db");
require("./passport");

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

//Initiate our app
const app = express();

require("../api/interceptor")(axios);

app.use(async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ["*"]);
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//Configure our app
app.use(require("cors")());
app.use(require("morgan")("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "site", "public")));
// app.use(express.static(path.join(__dirname, "admin", "public")));

// app.use(require("cookie-parser")());
// app.use(
//   require("express-session")({
//     secret: "passport-tutorial",
//     resave: true,
//     rolling: true,
//     saveUninitialized: false,
//     cookie: { maxAge: 60000 }
//   })
// );
app.use(passport.initialize());
// app.use(passport.session());

app.use("/", require("./routes/index"));

if (!isProduction) {
  app.use(errorHandler());
}

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    console.log(res.locals.error);
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
}

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

app.listen(process.env.PORT || config.server.port, () => {
  console.log(`server is running on port: ${config.server.port}`);
});
