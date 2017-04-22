'use strict';

module.exports = app => {
  app.get('/', function* () {
    this.body = 'hi, ' + app.plugins.view.name;
  });
  app.get('/renderString', 'view.renderString');
  app.get('/renderStringError', 'view.renderStringError');
  app.get('/render', 'view.render');
  app.get('/renderError', 'view.renderError');
};
