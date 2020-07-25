const mongoose = require('mongoose');
const { USER, PASSWORD, HOST, PORT, NAME } = require('@config').db;

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`)
  .catch(e => {
    console.error(e);
    throw e;
  });

mongoose.connection.on('connected', () => {
  console.log(
    `Mongoose default connection open mongodb://${HOST}:${PORT}/${NAME}`,
  );
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

require('./models/post');
require('./models/skill');
require('./models/work');
require('./models/user');
