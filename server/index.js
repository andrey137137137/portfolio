require('module-alias/register');
require('./db');

const { IS_DEV } = require('@apiHelpers');
const app = require('express')();

console.log('IS_DEV: ' + IS_DEV);

app.use(require('morgan')('dev'));

if (IS_DEV) {
  require('./cors')(app);
  require('./logger')(app);
}

require('./parsersAndSession')(app);
require('./router')(app);

const { NAME, PORT } = require('@config').server;

app.listen(PORT, () => {
  console.log(`${NAME} is running on port: ${PORT}`);
});
