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
   * @property {Object} [cache] lru-cache options @see https://www.npmjs.com/package/lru-cache
   * @property {Object} [renderOptions] @see https://ssr.vuejs.org/en/api.html#renderer-options
   * renderOptions.template will override layout template
   *
   */
  config.vue = {
    cache: {
      max: 1000,
      maxAge: 1000 * 3600 * 24 * 7,
    },
    //renderOptions: {
    //  template: `<!DOCTYPE html><html lang="en"><body><!--vue-ssr-outlet--></body></html>`,
    //},
  };

  return config;
};
