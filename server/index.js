require('module-alias/register');

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const errorHandler = require('errorhandler');
// const bunyan = require('bunyan');

const { NAME, PROTOCOL, HOST, PORT, URL } = require('@config').server;
const CLIENT_PORT = require('@config').client.PORT;
const { SECRET, KEY } = require('@config').session;
require('./db');
const {
  SUCCESS,
  // NOT_FOUND,
  ERROR,
} = require('@httpSt');
const { isDev } = require('@apiHelpers');
const curPort = PORT || process.env.PORT;

const app = express();

// const log = bunyan.createLogger({
//   name: NAME,
//   serializers: {
//     req: bunyan.stdSerializers.req,
//     res: bunyan.stdSerializers.res,
//   },
// });

// const cookieExpirationDate = new Date();
// const cookieExpirationDays = 365;

// cookieExpirationDate.setDate(
//   cookieExpirationDate.getDate() + cookieExpirationDays
// );

app.use(
  cors({
    origin: `${PROTOCOL}://${HOST}:${CLIENT_PORT}`,
    optionsSuccessStatus: SUCCESS,
    credentials: true,
  }),
);

console.log('isDev: ' + isDev);

// if (isDev) {
app.use(logger('dev'));
// }

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

if (!isDev) {
  const history = require('connect-history-api-fallback');
  const path = require('path');

  app.use(history());
  app.use(express.static('client'));

  // D:\Web-development\nodeJS_domains\portfolio\client\index.html
  console.log('client: ' + path.resolve('client', 'admin.html'));

  app.get('/admin/', (req, res) => {
    res.sendFile(path.resolve('client', 'admin.html'));
  });
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client', 'index.html'));
  });
}

app.use(URL, require('./routes/index'));

if (isDev) {
  app.use(errorHandler());
}

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = NOT_FOUND;
//   next(err);
// });

//Error handlers & middlewares
if (isDev) {
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    // console.log(err);
    // res.locals.message = err.message;
    // res.locals.error = req.app.get("env") === "development" ? err : {};
    console.log(err.message);
    // render the error page
    res.status(ERROR).json(err.message);
    // res.render("error");
  });
}

app.listen(curPort, () => {
  console.log(`${NAME} is running on port: ${curPort}`);
});
