'use strict';

const Engine = require('../../lib/engine');
const VUE_ENGINE = Symbol('Application#vue');

module.exports = {

  get vue() {
    if (!this[VUE_ENGINE]) {
      this[VUE_ENGINE] = new Engine(this);
    }
    return this[VUE_ENGINE];
  },
};
