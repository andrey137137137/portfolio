require('module-alias/register');

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const bunyan = require('bunyan');

const { NAME, PROTOCOL, HOST, PORT, URL } = require('@config').server;
const CLIENT_PORT = require('@config').client.PORT;
const { SECRET, KEY } = require('@config').session;
require('./db');
const { SUCCESS, NOT_FOUND } = require('@httpSt');
const { isDev } = require('@apiHelpers');
const SERVER_PORT = PORT || process.env.PORT;

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

const app = require('express')();

if (isDev) {
  app.use(require('errorhandler')());
  app.use(
    require('cors')({
      origin: `${PROTOCOL}://${HOST}:${CLIENT_PORT}`,
      optionsSuccessStatus: SUCCESS,
      credentials: true,
    }),
  );
}

console.log('isDev: ' + isDev);

// if (isDev) {
app.use(require('morgan')('dev'));
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(require('cookie-parser')());
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

app.use(URL, require('./routes/index'));

if (!isDev) {
  require('./client')(app);
} else {
  // catch 404 and forward to error handler
  app.get('/*', (req, res) => {
    res.status(NOT_FOUND).json({ msg: 'Not Found' });
  });
}

app.listen(SERVER_PORT, () => {
  console.log(`${NAME} is running on port: ${SERVER_PORT}`);
});
