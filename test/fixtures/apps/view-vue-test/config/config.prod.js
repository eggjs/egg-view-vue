'use strict';

module.exports = () => {
  const config = {};
  const cacheObject = {};
  config.vue = {
    cache: {
      set(name, value) {
        cacheObject[name] = value;
      },
      get(name) {
        return cacheObject[name];
      },
    },
  };

  return config;
};
