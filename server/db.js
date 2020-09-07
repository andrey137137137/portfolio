const mongoose = require('mongoose');
const { USER, PASSWORD, HOST, PORT, NAME } = require('@config').db;
let isFirstConnected = false;

mongoose.Promise = global.Promise;

function connectDB() {
  mongoose.connect(`mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

mongoose.connection.on('connected', () => {
  console.log(
    `Mongoose default connection open mongodb://${HOST}:${PORT}/${NAME}`,
  );
  isFirstConnected = true;
});

mongoose.connection.on('error', err => {
  console.log('Mongoose default connection error: ' + err);
  if (!isFirstConnected) {
    setTimeout(connectDB, 1000);
  }
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

connectDB();

require('./models/post');
require('./models/skill');
require('./models/work');
require('./models/comment');
require('./models/user');
