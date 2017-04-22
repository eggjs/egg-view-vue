'use strict';

module.exports = app => {
  app.view.use('vue', require('./lib/view'));
};
