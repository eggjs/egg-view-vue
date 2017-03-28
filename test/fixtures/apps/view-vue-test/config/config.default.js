'use strict';

const path = require('path');

module.exports = app => {
  const exports = {};

  exports.keys = '123456';

  exports.view = {
    root: path.join(app.baseDir, 'public'),
    defaultViewEngine: 'vue',
    cache: false
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  return exports;
};
