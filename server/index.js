require('module-alias/register');
require('./db');

const { IS_DEV } = require('@apiHelpers');
const app = require('express')();

console.log('IS_DEV: ' + IS_DEV);

app.use(require('morgan')('dev'));

if (IS_DEV) {
  require('./logger')(app);
  require('./cors')(app);
}

require('./parsersAndSession')(app);
require('./router')(app);

const { NAME, PORT } = require('@config').server;
const SERVER_PORT = process.env.PORT || PORT;

app.listen(SERVER_PORT, () => {
  console.log(`${NAME} is running on port: ${SERVER_PORT}`);
});
