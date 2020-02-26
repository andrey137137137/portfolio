const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const axios = require("axios");
const config = require("../api/config");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const passport = require("passport");
// const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const errorHandler = require("errorhandler");

require("./db");
// require("./passport")(passport);

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

// const store = new MongoDBStore({
//   uri: `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`,
//   collection: "sessions"
// });

// store.on("error", error => console.log(error));

//Initiate our app
const app = express();
const interceptor = require("./../api/interceptor");

interceptor(axios);

// const secret = "jrqkwle85903gi89gsdjhfsg83473";
// const cookieExpirationDate = new Date();
// const cookieExpirationDays = 365;

// cookieExpirationDate.setDate(
//   cookieExpirationDate.getDate() + cookieExpirationDays
// );

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
// app.use(require("cors")());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  session({
    secret: "kjfnksbfksdbkfej",
    key: "testing_key",
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
    }
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

app.use((req, res, next) => {
  req.session.visitNumber = req.session.visitNumber + 1 || 1;
  // res.send("Visits: " + req.session.visitNumber);
  next();
});

app.use("/", require("./routes/index"));

if (!isProduction) {
  app.use(errorHandler());
}

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

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

app.listen(process.env.PORT || config.server.port, () => {
  console.log(`server is running on port: ${config.server.port}`);
});
