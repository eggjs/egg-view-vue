'use strict';

module.exports = () => {
  const exports = {};
  const cacheObject = {};
  exports.vue = {
    cache: {
      set: (name, value) => {
        cacheObject[name] = value;
      },
      get: name => {
        return cacheObject[name];
      },
    },
  };

  return exports;
};
