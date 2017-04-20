'use strict';

const Engine = require('../../lib/engine');
const VUEENGINE = Symbol('Application#VueEngine');

module.exports = {

  get vueEngine() {
    if (!this[VUEENGINE]) {
      this[VUEENGINE] = new Engine(this);
    }
    return this[VUEENGINE];
  },
};
