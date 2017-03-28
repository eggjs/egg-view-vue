'use strict';

const path = require('path');

module.exports = app => {
  const exports = {};

  exports.keys = '123456';

  exports.view = {
    root: path.join(app.baseDir, 'public'),
    defaultViewEngine: 'vue',
    cache: false,
    solution: {
      layout: path.join(app.baseDir, 'app/view/layout.html')
    }
  };

  return exports;
};
