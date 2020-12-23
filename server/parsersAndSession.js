module.exports = app => {
  // const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const session = require('express-session');
  const MongoStore = require('connect-mongo')(session);
  const { SECRET, KEY } = require('@config').session;

  // const cookieExpirationDate = new Date();
  // const cookieExpirationDays = 365;

  // cookieExpirationDate.setDate(
  //   cookieExpirationDate.getDate() + cookieExpirationDays
  // );

  // app.use(require('cookie-parser')());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(
    session({
      secret: SECRET,
      key: KEY,
      store: new MongoStore({
        mongooseConnection: require('mongoose').connection,
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
      },
    }),
  );
};
