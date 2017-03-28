/**
 * Created by caoli on 17/1/4.
 */
'use strict';
const fs = require('fs');
const vueServerRenderer = require('vue-server-renderer');
const renderer = vueServerRenderer.createRenderer();
const utils = require('./utils');

class Engine {
  constructor(app) {
    this.app = app;
    this.config = app.config.view;
  }

  createBundleRenderer(code) {
    return vueServerRenderer.createBundleRenderer(code, {
      cache: require('lru-cache')(this.config.lruCacheOptions),
    });
  }

  readFile(name) {
    return new Promise((resolve, reject) => {
      fs.readFile(name, 'utf8', (err, data) => {
        /* istanbul ignore next */
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  renderCode(code, data = {}) {
    utils.formatData(data);
    const bundleRenderer = this.createBundleRenderer(code);
    return new Promise((resolve, reject) => {
      bundleRenderer.renderToString({
        data,
      }, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }

  renderString(vm) {
    return new Promise((resolve, reject) => {
      renderer.renderToString(vm, (err, html) => {
        /* istanbul ignore next */
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
