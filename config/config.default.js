'use strict';
const path = require('path');

module.exports = app => {
  const exports = {};

  exports.view = {
    root: path.join(app.baseDir, 'public'),
    defaultViewEngine: 'vue',
    cache: 'memory',
    // render bundle lru cache
    lruCacheOptions: {
      max: 1000,
      maxAge: 1000 * 3600 * 24 * 7,
    },
  };

  return exports;
};
