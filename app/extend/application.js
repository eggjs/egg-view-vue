'use strict';

const Engine = require('../../lib/engine');
const SolutionEngine = require('../../lib/solution/engine');
const SOLUTION = Symbol('Application#SolutionConfig');
const VUEENGINE = Symbol('Application#VueEngine');
const extend = require('extend');

module.exports = {

  get viewEngine() {
    if (!this[VUEENGINE]) {
      if (this.config.view.solution) {
        this[VUEENGINE] = new SolutionEngine(this);
      } else {
        this[VUEENGINE] = new Engine(this);
      }
    }
    return this[VUEENGINE];
  },

  get solution() {
    const solution = this.config.view.solution;
    if (solution) {
      if (!this[SOLUTION]) {
        const Helper = require('../../lib/solution/helper')(this);
        const Cache = require('../../lib/solution/cache')(this);
        const config = Helper.getBuildConfig(this);
        this[SOLUTION] = extend(true, {
          cache: new Cache(),
          layoutTemplate: Helper.readFile(solution.layout),
          manifest: Helper.getManifest(config),
        }, solution, config);
      }
      return this[SOLUTION];
    }
    return null;
  },
};
