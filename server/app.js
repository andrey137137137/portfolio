require("module-alias/register");

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const errorHandler = require("errorhandler");

const { PROTOCOL, HOST, PORT, FRONT_PORT, URL } = require("@config").server;
const { SECRET, KEY } = require("@config").session;
require("./db");

const isProduction = process.env.NODE_ENV === "production";

// const store = new MongoDBStore({
//   uri: `mongodb://${config.db.user}:${config.db.password}@${config.db.HOST}:${config.db.PORT}/${config.db.name}`,
//   collection: "sessions"
// });

// store.on("error", error => console.log(error));

const app = express();

// const cookieExpirationDate = new Date();
// const cookieExpirationDays = 365;

// cookieExpirationDate.setDate(
//   cookieExpirationDate.getDate() + cookieExpirationDays
// );

app.use(
  cors({
    origin: `${PROTOCOL}://${HOST}:${FRONT_PORT}`,
    credentials: true
  })
);

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  session({
    secret: SECRET,
    key: KEY,
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

app.use((req, res, next) => {
  console.log(req.session);
  // req.session.test = req.session.test + 1 || 1;
  // res.send("Visits: " + req.session.test);
  next();
});

app.use(URL, require("./routes/index"));

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

app.listen(process.env.PORT || PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
