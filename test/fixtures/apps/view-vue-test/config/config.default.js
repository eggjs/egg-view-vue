'use strict';

const path = require('path');

module.exports = app => {
  const exports = {};

  exports.keys = '123456';

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs'),
  };

  return exports;
};
