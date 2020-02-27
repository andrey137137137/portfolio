const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const passport = require("passport");
// const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const errorHandler = require("errorhandler");

const { port, url } = require("../api/config").server;
require("./db");
// require("./passport")(passport);

const isProduction = process.env.NODE_ENV === "production";

// const store = new MongoDBStore({
//   uri: `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`,
//   collection: "sessions"
// });

// store.on("error", error => console.log(error));

const app = express();

// const secret = "jrqkwle85903gi89gsdjhfsg83473";
// const cookieExpirationDate = new Date();
// const cookieExpirationDays = 365;

// cookieExpirationDate.setDate(
//   cookieExpirationDate.getDate() + cookieExpirationDays
// );

// app.use(async (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", ["*"]);
//   res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

app.use(cors());
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
  req.session.test = req.session.test + 1 || 1;
  // res.send("Visits: " + req.session.test);
  next();
});

app.use(url, require("./routes/index"));

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

app.listen(process.env.PORT || port, () => {
  console.log(`server is running on port: ${port}`);
});
