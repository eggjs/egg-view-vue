'use strict';

const Vue = require('vue');
const LRU = require('lru-cache');
const vueServerRenderer = require('vue-server-renderer');
const FileLoader = require('./loader');

class Engine {
  constructor(app) {
    this.app = app;
    this.config = app.config.vue;
    this.cache = LRU(this.config.cache);
    this.fileLoader = new FileLoader(app, this.cache);
    this.vueServerRenderer = vueServerRenderer;
    this.renderer = this.vueServerRenderer.createRenderer();
    this.renderOptions = Object.assign({
      cache: this.cache,
    }, this.config.renderOptions);
  }

  createBundleRenderer(bundle, renderOptions) {
    return this.vueServerRenderer.createBundleRenderer(bundle, Object.assign({}, this.renderOptions, renderOptions));
  }

  * readFile(name) {
    return yield this.fileLoader.load(name);
  }

  renderBundle(bundle, context = {}, options = {}) {
    return new Promise((resolve, reject) => {
      this.createBundleRenderer(bundle, options.renderOptions).renderToString(context, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }

  renderString(tpl, locals, options) {
    const vConfig = Object.assign({ template: tpl, data: locals }, options);
    const vm = new Vue(vConfig);
    return new Promise((resolve, reject) => {
      this.renderer.renderToString(vm, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }
}

module.exports = Engine;
