'use strict';

module.exports = () => {
  const exports = {};

  exports.vue = {
    cache: {
      max: 1000,
      maxAge: 1000 * 3600 * 24 * 7,
    },
  };

  return exports;
};
