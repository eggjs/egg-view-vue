/**
 * Created by caoli on 17/1/17.
 */
'use strict';
module.exports = app => {
  class Cache {

    constructor() {
      this.cache = {};
      this.options = app.config.view;
      this.isCache = this.memory = this.options.cache === 'memory';
      if (typeof this.options.cache === 'object') {
        if (!this.options.cache.get || !this.options.cache.set) {
          throw new Error('Invalid cache option ' + JSON.stringify(this.options.cache) + ' found. Expected "memory" or { get: function (key) { ... }, set: function (key, value) { ... } }.');
        }
        this.isCache = true;
      }
    }

    get(key) {
      if (!this.isCache) {
        return;
      }

      if (this.memory) {
        return this.cache[key];
      }

      return this.options.cache.get(key);
    }

    set(key, value) {
      if (!this.isCache) {
        return;
      }

      if (this.memory) {
        this.cache[key] = value;
        return;
      }

      this.options.cache.set(key, value);
    }

    clear() {
      if (this.memory) {
        this.cache = {};
      }
    }
  }

  return Cache;
};
