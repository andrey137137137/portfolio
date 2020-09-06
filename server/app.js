require('module-alias/register');

const {
  SUCCESS,
  // NOT_FOUND,
  ERROR,
} = require('@httpSt');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const errorHandler = require('errorhandler');

const { PROTOCOL, HOST, PORT, FRONT_PORT, URL } = require('@config').server;
const { SECRET, KEY } = require('@config').session;
require('./db');

// console.log(isFirstConnected);

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// const cookieExpirationDate = new Date();
// const cookieExpirationDays = 365;

// cookieExpirationDate.setDate(
//   cookieExpirationDate.getDate() + cookieExpirationDays
// );

app.use(
  cors({
    origin: `${PROTOCOL}://${HOST}:${FRONT_PORT}`,
    optionsSuccessStatus: SUCCESS,
    credentials: true,
  }),
);

if (!isProduction) {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  session({
    secret: SECRET,
    key: KEY,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  }),
);

app.use(URL, require('./routes/index'));

if (!isProduction) {
  app.use(errorHandler());
}

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = NOT_FOUND;
//   next(err);
// });

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    // set locals, only providing error in development
    // console.log(err);
    // res.locals.message = err.message;
    // res.locals.error = req.app.get("env") === "development" ? err : {};
    console.log(err.message);
    // render the error page
    res.json(err.status || ERROR);
    // res.render("error");
  });
}

app.listen(process.env.PORT || PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
