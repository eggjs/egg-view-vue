'use strict';

module.exports = app => {
  app.get('/', function* () {
    this.body = 'hi, ' + app.plugins.view.name;
  });
  app.get('/renderString', 'view.renderString');
  app.get('/render', 'view.render');
  app.get('/error', 'view.error');
  app.get('/viewEngine/readFile', 'view.viewEngineReadFile');
  app.get('/viewEngine/renderString', 'view.viewEngineRenderString');
  app.get('/viewEngine/renderCode', 'view.viewEngineRenderCode');

};
