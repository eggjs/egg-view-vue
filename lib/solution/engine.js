/**
 * Created by caoli on 17/1/4.
 */
'use strict';
const BaseEngine = require('../engine');

class Engine extends BaseEngine {

  * readFile(name) {
    if (this.app.solution.cache.isCache) {
      let content = this.app.solution.cache.get(name);
      if (content) {
        return content;
      }
      content = yield super.readFile(name);
      this.app.solution.cache.set(name, content);
      return content;
    }
    return yield super.readFile(name);
  }
}

module.exports = Engine;

