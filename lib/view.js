/**
 * Created by caoli on 17/3/16.
 */
'use strict';

class View {
  constructor(ctx) {
    this.app = ctx.app;
  }

  * render(name, data, options = {}) {
    const code = yield this.app.viewEngine.readFile(name);
    return this.app.viewEngine.renderCode(code, data, options);
  }

  renderString(vm) {
    return this.app.viewEngine.renderString(vm);
  }
}

module.exports = View;
