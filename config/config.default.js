'use strict';

exports.view = {
  defaultViewEngine: 'vue',
  mapping: {
    '.js': 'vue',
  },
};

/**
 * vue view options
 * @property {Object} [cache] lru-cache options @see https://www.npmjs.com/package/lru-cache
 *
 */
exports.vue = {
  cache: {
    max: 1000,
    maxAge: 1000 * 3600 * 24 * 7,
  },
};
