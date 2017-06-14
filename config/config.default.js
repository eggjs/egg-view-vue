'use strict';

module.exports = () => {
  const config = {};

  config.view = {
    defaultViewEngine: 'vue',
    mapping: {
      '.js': 'vue',
    },
  };

  /**
   * vue view options
   * @property {Object|Boolean} [cache] support LRU cache or custom cache(implement set and get method)
   *  - Boolean: default true, use LRU cache
   *  - Object:  support set LRU or custom cache(implement set and get method)
   * @property {Object} [renderOptions] @see https://ssr.vuejs.org/en/api.html#renderer-options
   * @example property [cache]
   * use default LRU cache:
   *  cache: true
   * disable default LRU cache:
   *  cache: false
   * use LRU cache and set LRU:
   *  cache:{
   *   max: 1000,
   *   maxAge: 1000 * 3600 * 24 * 7,
   *  }
   * custom cache(implement set and get method):
   *  cache: {
   *   get: (key, cb) => {
   *    return ...;
   *   },
   *   set: (key, val) => {
   *     ...
   *   }
   *  }
   *
   */
  config.vue = {
    cache: true,
    // renderOptions: {
    //   template: `<!DOCTYPE html><html lang="en"><body><!--vue-ssr-outlet--></body></html>`,
    //   ......
    // },
  };

  return config;
};
