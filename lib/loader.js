'use strict';
const fs = require('fs');

class FileLoader {
  constructor(app, lru) {
    this.app = app;
    this.config = this.app.config.vue;
    this.isCache = this.config.cache && this.config.cache.max && this.config.cache.maxAge > 0;
    this.cache = lru;
  }

  readFile(name) {
    return new Promise((resolve, reject) => {
      fs.readFile(name, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  * load(name) {
    if (this.isCache) {
      let content = this.cache.get(name);
      if (content) {
        return content;
      }
      content = yield this.readFile(name);
      this.cache.set(name, content);
      return content;
    }
    return yield this.readFile(name);
  }
}

module.exports = FileLoader;

