const express = require("express");
const bodyParser = require("body-parser");
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

const secret = "jrqkwle85903gi89gsdjhfsg83473";
const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;

cookieExpirationDate.setDate(
  cookieExpirationDate.getDate() + cookieExpirationDays
);

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

app.use(require("cookie-parser")(secret));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.enable("trust proxy"); // add this line
app.use(
  require("express-session")({
    secret,
    resave: true,
    // rolling: true,
    saveUninitialized: true,
    // proxy: true, // add this line
    cookie: {
      // secure: true,
      httpOnly: true,
      expires: cookieExpirationDate
      // maxAge: 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
