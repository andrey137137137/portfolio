const path = require('path');
const builtClient = 'client';

module.exports = function(app) {
  app.use(require('express').static(builtClient));

  app.get('/admin/*', (req, res) => {
    res.sendFile(path.resolve(builtClient, 'admin.html'));
  });
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(builtClient, 'index.html'));
  });
};
